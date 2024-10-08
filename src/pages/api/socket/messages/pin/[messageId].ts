import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await currentUserPages(req, res);
        const { messageId, workspaceId, channelId, pinId } = req.query;

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
            include: {
                pipelines: true,
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

        const pipeline = await db.pipeline.findFirst({
            where: {
                name: "Pins",
                channelId: channel.id as string,
            },
        });

        if (req.method === "DELETE") {
            const pin = await db.pin.findFirst({
                where: {
                    id: pinId as string,
                    channelId: channelId as string,
                },
            });

            if (!pin) {
                return res.status(404).json({ error: "Pin not found" });
            }

            await db.$transaction(async (prisma) => {
                await prisma.message.update({
                    where: {
                        id: messageId as string,
                    },
                    data: {
                        pin: {
                            disconnect: true,
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
                    },
                });

                await prisma.pin.delete({
                    where: {
                        id: pinId as string,
                    },
                });
            });
        }

        if (req.method === "PATCH") {
            message = await db.message.update({
                where: {
                    id: messageId as string,
                },
                data: {
                    pin: {
                        create: {
                            id: nanoid(11),
                            memberId: member?.id,
                            channelId: channelId as string,
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
                },
            });
        }
        if (!pipeline) {
            await db.$transaction(async (prisma) => {
                await prisma.pipeline.create({
                    data: {
                        channelId: channelId as string,
                        id: nanoid(11),
                        name: "Pins",
                        order: 3,
                    },
                });
            });
        }

        const pipelines = await db.pipeline.findMany({
            where: {
                channelId: channelId as string,
            },
        });

        const updatekey = `chat:${channelId}:messages:update`;
        const updatePipeLineKey = `pipeline:${channelId}:update`;

        res?.socket?.server?.io?.emit(updatekey, message);
        res?.socket?.server?.io?.emit(updatePipeLineKey, pipelines);

        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGES_ID]", error);
        return res.status(500).json({ error: "Internal Error" });
    }
}
