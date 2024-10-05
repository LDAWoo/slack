import { MemberRole, Workspace } from "@prisma/client";
import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await currentUserPages(req, res);
        const { messageId, workspaceId, channelId } = req.query;
        const { content } = req.body;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!workspaceId) {
            return res.status(404).json({ error: "Workspace ID missing" });
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
                workspaceId: workspaceId as string,
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
                channelId: channelId as string,
            },
            include: {
                member: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!message || message.deleted) {
            return res.status(404).json({ error: "Message not found" });
        }

        const isMessageOwner = message.memberId === member.id;
        const isAdmin = member.role === MemberRole.GUEST;

        const canModify = isMessageOwner || isAdmin;

        if (!canModify) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (req.method === "DELETE") {
            message = await db.message.update({
                where: {
                    id: messageId as string,
                },
                data: {
                    deleted: true,
                    fileUrl: null,
                    content: "This message has been deleted",
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

        if (req.method === "PATCH") {
            if (!isMessageOwner) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            message = await db.message.update({
                where: {
                    id: messageId as string,
                },
                data: {
                    content,
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
