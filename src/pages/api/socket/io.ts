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
        const httpServer: NetServer = res.socket.server as any;
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
