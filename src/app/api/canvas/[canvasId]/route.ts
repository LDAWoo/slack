import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            canvasId: string;
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

        const canvas = await db.canvas.findFirst({
            where: {
                id: params.canvasId,
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
                },
            },
        });

        return NextResponse.json(canvas);
    } catch (error) {
        console.log("[CANVAS_ID_GET]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
