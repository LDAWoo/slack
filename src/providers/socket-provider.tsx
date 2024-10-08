"use client";

import { RootState } from "@/lib/shared/store";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { workspace } = useSelector((state: RootState) => state.workspace);
    const { member } = useSelector((state: RootState) => state.member);

    useEffect(() => {
        if (!workspace || !member) return;
        const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
            query: { workspaceId: workspace.id, memberId: member.id },
        });

        socketInstance.on("connect", () => {
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [workspace, member]);

    return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
