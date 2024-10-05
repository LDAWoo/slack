import { db } from "@/lib/db";

export const getWorkspace = async (workspaceId: string) => {
    const workspace = await db.workspace.findFirst({
        where: {
            id: workspaceId,
        },
    });

    return workspace;
};
