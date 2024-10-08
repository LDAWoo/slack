import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { Pipeline } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await currentUserPages(req, res);

        const { channelId, workspaceId } = req.query;
        const { pipelines } = req.body;
        const currentPipeline = pipelines as Pipeline[];

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        if (!channelId) {
            return res.status(404).json({ error: "Channel ID missing" });
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

        let updatePipelines = [];

        const updateTrans = currentPipeline.map((pipeline) =>
            db.pipeline.update({
                where: {
                    id: pipeline.id,
                },
                data: {
                    order: pipeline.order,
                },
            })
        );

        updatePipelines = await db.$transaction(updateTrans);

        if (!updatePipelines) {
            updatePipelines = await db.pipeline.findMany({
                where: {
                    channelId: channel.id,
                },
                orderBy: {
                    order: "asc",
                },
            });
        }

        const updatePipeLineKey = `pipeline:${channelId}:update`;

        res?.socket?.server?.io?.emit(updatePipeLineKey, updatePipelines);

        return res.status(200).json(updatePipelines);
    } catch (error) {
        console.log("[PIPELINES]", error);
        return res.status(500).json({ error: "Internal Error" });
    }
}
