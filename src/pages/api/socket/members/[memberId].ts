import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await currentUserPages(req, res);
        const { workspaceId, memberId, isOnline, statusText, statusEmoji, statusExpiration } = req.query;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!workspaceId) {
            return res.status(404).json({ error: "Workspace ID missing" });
        }

        // Fetch existing member data
        const existingMember = await db.member.findUnique({
            where: {
                id: memberId as string,
                workspaceId: workspaceId as string,
            },
            include: {
                user: true,
            },
        });

        if (!existingMember) {
            return res.status(404).json({ error: "Member not found" });
        }

        const member = await db.member.update({
            where: {
                id: memberId as string,
                workspaceId: workspaceId as string,
            },
            data: {
                user: {
                    update: {
                        isOnline: isOnline !== undefined ? isOnline === "true" : existingMember.user.isOnline,
                        lastOnline: new Date(),
                        statusText: statusText !== undefined ? (statusText as string) : existingMember.user.statusText,
                        statusEmoji: statusEmoji !== undefined ? (statusEmoji as string) : existingMember.user.statusEmoji,
                        statusExpiration: statusExpiration !== undefined ? (statusExpiration as string) : existingMember.user.statusExpiration,
                    },
                },
            },
            include: {
                user: true,
            },
        });

        const updateKey = `member:${workspaceId}:update`;
        res?.socket?.server?.io?.emit(updateKey, member);
        return res.status(200).json(member);
    } catch (error) {
        console.log("[MEMBER_ID]", error);
        return res.status(500).json({ error: "Internal Error" });
    }
}
