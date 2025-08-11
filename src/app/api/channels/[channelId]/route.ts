import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            channelId: string;
        };
    }
) {
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

        const channel = await db.channel.findUnique({
            where: {
                id: params.channelId,
                workspaceId: workspaceId as string,
            },
        });

        return NextResponse.json(channel);
    } catch (error) {
        console.log("[CHANNEL_ID_GET]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
