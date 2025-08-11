"use client";
import { useSocket } from "@/providers/socket-provider";
import { useEffect, useState } from "react";

type Cursor = {
    canvasId: string;
    memberId: string;
    x: number;
    y: number;
};

export const useCursor = (canvasId: string) => {
    const { socket } = useSocket();
    const [cursors, setCursors] = useState<Cursor[]>([]);

    useEffect(() => {
        if (!socket) return;

        const handleMouseMove = (data: { id: string; memberId: string; x: number; y: number }) => {
            setCursors((prevCursors) => {
                const cursorIndex = prevCursors.findIndex((cursor) => cursor.memberId === data.memberId);

                if (cursorIndex !== -1) {
                    // If cursor for this memberId exists, update it
                    const updatedCursors = [...prevCursors];
                    updatedCursors[cursorIndex] = { ...updatedCursors[cursorIndex], x: data.x, y: data.y };
                    return updatedCursors;
                } else {
                    // If it doesn't exist, add it as a new cursor
                    return [...prevCursors, { canvasId, memberId: data.memberId, x: data.x, y: data.y }];
                }
            });
        };

        const handleMouseLeave = (data: { memberId: string }) => {
            setCursors((prevCursors) => {
                // Remove the cursor of the member who left
                return prevCursors.filter((cursor) => cursor.memberId !== data.memberId);
            });
        };
        socket.on("mouse-move", handleMouseMove);
        socket.on("mouse-leave", handleMouseLeave);

        // Cleanup on unmount
        return () => {
            socket.off("mouse-move", handleMouseMove);
            socket.off("mouse-leave", handleMouseLeave);
        };
    }, [socket, canvasId]);

    return cursors;
};
