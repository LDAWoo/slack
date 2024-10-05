import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {
        params,
    }: {
        params: {
            memberId: string;
        };
    }
) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);
        const { name, imageUrl } = await req.json();

        const workspaceId = searchParams.get("workspaceId");

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!workspaceId) {
            return new NextResponse("Workspace Id Missing", {
                status: 400,
            });
        }

        if (!params.memberId) {
            return new NextResponse("Member Id Missing", {
                status: 400,
            });
        }

        const workspace = await db.workspace.update({
            where: {
                id: workspaceId,
                members: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            data: {
                step: 2,
                members: {
                    update: {
                        where: {
                            id: params.memberId || nanoid(11),
                        },
                        data: {
                            name,
                            imageUrl,
                        },
                    },
                },
            },
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.log("[MEMBER_ID_PATCH]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
