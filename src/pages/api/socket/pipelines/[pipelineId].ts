import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { Pipeline } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await currentUserPages(req, res);
        const { workspaceId, channelId, pipelineId } = req.query;
        const { status } = req.body;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
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

        const pipeline = await db.pipeline.findFirst({
            where: {
                id: pipelineId as string,
                channelId: channel.id,
            },
            include: {
                lanes: true,
            },
        });

        if (!pipeline) {
            return res.status(404).json({ error: "Pipeline not found" });
        }

        let pipelines = [] as Pipeline[];

        if (req.method === "PATCH") {
            await db.pipeline.update({
                where: {
                    id: pipelineId as string,
                    channelId: channel.id,
                },
                data: {
                    status: status !== undefined ? status : pipeline.status,
                },
                include: {
                    lanes: true,
                },
            });

            pipelines = await db.pipeline.findMany({
                where: {
                    channelId: channel.id,
                },
                include: {
                    lanes: true,
                },
                orderBy: {
                    order: "asc",
                },
            });
        }

        const updateKey = `pipeline:${channelId}:update`;
        res?.socket?.server?.io?.emit(updateKey, pipelines);
        return res.status(200).json(pipelines);
    } catch (error) {
        console.log("[PIPELINES_ID]", error);
        return res.status(500).json({ error: "Internal Error" });
    }
}
