import { NextApiResponseServerIo } from "@/lib/types";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.IO server");
        const path = "/api/socket/io";
        const httpServer = res.socket.server as NetServer;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
            cors: {
                origin: "*",
            },
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            socket.on("mousemove", (data: { canvasId: string; memberId: string; x: number; y: number }) => {
                socket.join(data.canvasId);
                const body = {
                    memberId: data.memberId,
                    x: data.x,
                    y: data.y,
                };
                socket.broadcast.to(data.canvasId).emit("mouse-move", body);
            });
            socket.on("mouseleave", (data: { canvasId: string; memberId: string }) => {
                socket.join(data.canvasId);
                const body = {
                    canvasId: data.canvasId,
                    memberId: data.memberId,
                };
                socket.broadcast.to(data.canvasId).emit("mouse-leave", body);
            });

            socket.on("mousedown", (data: { canvasId: string; memberId: string; elementId: string }) => {
                socket.join(data.canvasId);
                const body = {
                    canvasId: data.canvasId,
                    memberId: data.memberId,
                    elementId: data.elementId,
                };
                socket.broadcast.to(data.canvasId).emit("mouse-down", body);
            });

            socket.on("disconnect", () => {
                const memberId = socket.handshake.query.memberId;
                const workspaceId = socket.handshake.query.workspaceId;

                console.log(`User disconnected: ${memberId}`);

                socket.leave(workspaceId as string);
                socket.broadcast.emit("member-disconnected", { workspaceId, memberId });
            });
        });
    } else {
        console.log("Socket.IO server already initialized");
    }

    res.end();
};

export default ioHandler;
