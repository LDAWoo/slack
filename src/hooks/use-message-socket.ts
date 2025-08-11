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

type PagesData = {
    pages: {
        messages: MessageWithMemberWithUser[];
    }[];
};

export const useMessageSocket = ({ addKey, updateKey, queryKey }: MessageSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(updateKey, (message: MessageWithMemberWithUser) => {
            queryClient.setQueryData<PagesData | undefined>([queryKey], (oldData) => {
                if (!oldData) return { pages: [{ messages: [message] }] };

                const updatedPages = oldData.pages.map((page) => ({
                    ...page,
                    messages: page.messages.map((m) => (m.id === message.id ? message : m)),
                }));

                return {
                    ...oldData,
                    pages: updatedPages,
                };
            });
        });

        socket.on(addKey, (message: MessageWithMemberWithUser) => {
            queryClient.setQueryData<PagesData | undefined>([queryKey], (oldData) => {
                if (!oldData) {
                    return {
                        pages: [
                            {
                                messages: [message],
                            },
                        ],
                    };
                }

                const newPages = [...oldData.pages];
                newPages[0] = {
                    ...newPages[0],
                    messages: [message, ...newPages[0].messages],
                };

                return {
                    ...oldData,
                    pages: newPages,
                };
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, socket, updateKey]);
};
