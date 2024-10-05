import { currentUser } from "@/lib/current-user";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);
        const channelId = searchParams.get("channelId");

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!channelId) {
            return new NextResponse("Channel ID missing", {
                status: 400,
            });
        }

        const pipelines = await db.pipeline.findMany({
            where: {
                channelId,
            },
            orderBy: {
                order: "asc",
            },
            include: {
                lanes: true,
            },
        });

        return NextResponse.json(pipelines);
    } catch (error) {
        console.log("[PIPELINES_GET]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
