"use client";

import { useSocket } from "@/providers/socket-provider";
import { Message, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type MessageSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

type MessageWithMemberWithUser = Message & {
    user: User;
};

export const useMessageSocket = ({ addKey, updateKey, queryKey }: MessageSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(updateKey, (message: MessageWithMemberWithUser) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return [message];
                }

                const newData = oldData.pages.map((page: any) => {
                    return {
                        ...page,
                        messages: page.messages.map((m: MessageWithMemberWithUser) => {
                            if (m.id === message.id) {
                                return m;
                            }

                            return m;
                        }),
                    };
                });

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        socket.on(addKey, (message: MessageWithMemberWithUser) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [
                            {
                                messages: [message],
                            },
                        ],
                    };
                }

                const newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    messages: [message, ...newData[0].messages],
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, socket, updateKey]);
};
