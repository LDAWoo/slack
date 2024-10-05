import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {
        params,
    }: {
        params: {
            workspaceId: string;
        };
    }
) {
    try {
        const user = await currentUser();
        const { name, step } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!params.workspaceId) {
            return new NextResponse("Workspace Id Missing", {
                status: 400,
            });
        }

        const workspace = await db.workspace.update({
            where: {
                id: params.workspaceId,
                members: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            data: {
                step,
                name,
            },
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.log("[WORKSPACE_ID_PATCH]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            workspaceId: string;
        };
    }
) {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        const workspace = await db.workspace.findFirst({
            where: {
                id: params.workspaceId as string,
                members: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: {
                channels: true,
                members: true,
            },
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.log("[WORKSPACE_ID_GET]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
