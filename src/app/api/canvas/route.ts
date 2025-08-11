import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const user = await currentUser();

        const { searchParams } = new URL(req.url);

        const workspaceId = searchParams.get("workspaceId");

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!workspaceId) {
            return new NextResponse("Workspace ID missing", {
                status: 400,
            });
        }

        const canvas = await db.canvas.findMany({
            where: {
                workspaceId,
                workspace: {
                    members: {
                        some: {
                            userId: user.id,
                        },
                    },
                },
            },
            include: {
                sections: {
                    include: {
                        elements: {
                            include: {
                                contents: true,
                            },
                        },
                    },
                    orderBy: {
                        order: "asc",
                    },
                },
            },
        });

        return NextResponse.json(canvas);
    } catch (error) {
        console.log("[CANVAS_GET]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
