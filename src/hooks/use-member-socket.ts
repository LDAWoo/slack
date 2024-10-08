"use client";

import { MemberWithUser } from "@/lib/types";
import { useSocket } from "@/providers/socket-provider";
import { Message, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type MemberSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

export const useMemberSocket = ({ addKey, updateKey, queryKey }: MemberSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(updateKey, (member: MemberWithUser) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData) return;

                const newData = oldData.map((m: MemberWithUser) => {
                    if (m.id === member.id) {
                        return member;
                    }
                    return m;
                });

                return newData;
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, socket, updateKey]);
};
