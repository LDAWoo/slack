import { db } from "@/lib/db";

export const getWorkspace = async (workspaceId: string) => {
    const workspace = await db.workspace.findFirst({
        where: {
            id: workspaceId,
        },
    });

    return workspace;
};

export const getWorkspaceByIdAndMemberId = async (workspaceId: string, memberId: string) => {
    const workspace = await db.workspace.findFirst({
        where: {
            id: workspaceId,
            members: {
                some: {
                    userId: memberId,
                },
            },
        },
        include: {
            channels: true,
            members: true,
            canvas: true,
        },
    });

    return workspace;
};
