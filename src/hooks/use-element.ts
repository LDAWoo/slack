import { useSocket } from "@/providers/socket-provider";
import { useEffect, useState } from "react";

export const useElement = (canvasId: string) => {
    const { socket } = useSocket();
    const [elements, setElements] = useState<{ memberId: string; elementId: string }[]>([]);

    useEffect(() => {
        if (!socket) return;

        const handleMouseDown = (data: { id: string; memberId: string; elementId: string }) => {
            setElements((prevElements) => {
                // Filter out the element if it exists
                const updatedElements = prevElements.filter((element) => element.memberId !== data.memberId);

                // Add the new element
                return [...updatedElements, { memberId: data.memberId, elementId: data.elementId }];
            });
        };

        socket.on("mouse-down", handleMouseDown);

        // Cleanup on unmount
        return () => {
            socket.off("mouse-down", handleMouseDown);
        };
    }, [socket, canvasId]);

    return elements;
};
