import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        const workspace = await db.workspace.create({
            data: {
                id: nanoid(11),
                userId: user.id,
                inviteCode: nanoid(11),
                members: {
                    create: [
                        {
                            id: nanoid(11),
                            userId: user.id,
                            email: user.email,
                            role: MemberRole.OWNER,
                        },
                    ],
                },
            },
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.log("[WORKSPACES_POST]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
