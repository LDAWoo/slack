"use client";
import { useSocket } from "@/providers/socket-provider";
import axios from "axios";
import qs from "query-string";
import { useEffect } from "react";

interface IConnection {
    workspaceId: string;
    memberId: string;
}

export const useConnection = ({ workspaceId, memberId }: IConnection) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket || !workspaceId || !memberId) return;

        const updateMemberStatus = async ({ isOnline, workspaceId, memberId }: { isOnline: boolean; workspaceId: string; memberId: string }) => {
            try {
                const url = qs.stringifyUrl({
                    url: `/api/socket/members/${memberId}`,
                    query: { isOnline, workspaceId },
                });
                await axios.post(url);
            } catch (error) {
                console.log(error);
            }
        };

        const handleDisconnected = async (data: { workspaceId: string; memberId: string }) => {
            updateMemberStatus({
                isOnline: false,
                workspaceId: data.workspaceId,
                memberId: data.memberId,
            });
        };

        updateMemberStatus({
            isOnline: true,
            workspaceId,
            memberId,
        });

        const updateInterval = setInterval(() => {
            updateMemberStatus({
                isOnline: true,
                workspaceId,
                memberId,
            });
        }, 60000); // Adjusted interval to 60 seconds

        socket.on("member-disconnected", handleDisconnected);

        return () => {
            clearInterval(updateInterval);
            socket.off("member-disconnected", handleDisconnected);
        };
    }, [socket, workspaceId, memberId]);
};
