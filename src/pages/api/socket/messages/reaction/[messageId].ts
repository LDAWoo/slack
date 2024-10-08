import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "DELETE" && req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await currentUserPages(req, res);
        const { messageId, workspaceId, channelId, reactionId } = req.query;
        const { emoji } = req.body;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        if (!workspaceId) {
            return res.status(404).json({ error: "Workspace Id missing" });
        }

        if (!channelId) {
            return res.status(404).json({ error: "Channel ID missing" });
        }

        const workspace = await db.workspace.findFirst({
            where: {
                id: workspaceId as string,
                members: {
                    some: {
                        userId: user?.id,
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

        let message = await db.message.findFirst({
            where: {
                id: messageId as string,
                channelId: channel.id,
            },
            include: {
                member: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (req.method === "DELETE") {
            const reaction = await db.reaction.findFirst({
                where: {
                    id: reactionId as string,
                    messageId: messageId as string,
                },
            });

            if (!reaction) {
                return res.status(404).json({ error: "Reaction not found" });
            }

            message = await db.message.update({
                where: {
                    id: messageId as string,
                },
                data: {
                    reactions: {
                        deleteMany: {
                            id: reactionId as string,
                        },
                    },
                },
                include: {
                    member: {
                        include: {
                            user: true,
                        },
                    },
                    pin: {
                        include: {
                            member: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                    reactions: {
                        include: {
                            member: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            });
        }

        if (req.method === "POST") {
            message = await db.message.update({
                where: {
                    id: messageId as string,
                },
                data: {
                    reactions: {
                        create: [
                            {
                                id: nanoid(11),
                                emoji,
                                memberId: member.id,
                            },
                        ],
                    },
                },
                include: {
                    member: {
                        include: {
                            user: true,
                        },
                    },
                    pin: {
                        include: {
                            member: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                    reactions: {
                        include: {
                            member: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            });
        }

        const updatekey = `chat:${channelId}:messages:update`;

        res?.socket?.server?.io?.emit(updatekey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGES_ID]", error);
        return res.status(500).json({ error: "Internal Error" });
    }
}
