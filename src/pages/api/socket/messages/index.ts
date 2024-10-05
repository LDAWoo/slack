import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const user = await currentUserPages(req, res);

        const { content, file } = req.body;
        const { workspaceId, channelId } = req.query;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        if (!workspaceId) {
            return res.status(400).json({ error: "Server Id missing" });
        }

        if (!channelId) {
            return res.status(400).json({ error: "Channel Id missing" });
        }

        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }

        const workspace = await db.workspace.findFirst({
            where: {
                id: workspaceId as string,
                members: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: {
                members: true,
            },
        });

        if (!workspace) {
            return res.status(404).json({ error: "Workspace not found" });
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                workspaceId: workspace.id,
            },
        });

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        const member = workspace.members.find((member) => member.userId === user.id);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const message = await db.message.create({
            data: {
                id: nanoid(11),
                content,
                fileUrl: file,
                channelId: channelId as string,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        const channelKey = `chat:${channelId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({
            message: "Internal Error",
        });
    }
}
