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

        const members = await db.member.findMany({
            where: {
                workspaceId,
            },
            include: {
                user: true,
            },
        });
        return NextResponse.json(members);
    } catch (error) {
        console.log("[GET_MEMBERS]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
