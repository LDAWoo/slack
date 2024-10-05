import { getOrCreateConversation } from "@/lib/conversations";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const conversations = await db.conversation.findMany({
            where: {
                memberOneEmail: user.email,
            },
        });

        return NextResponse.json(conversations);
    } catch (error) {
        console.error("[CONVERSATIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get("workspaceId");
        const { emails } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!workspaceId) {
            return new NextResponse("Workspace Id Missing", { status: 400 });
        }

        if (Array.isArray(emails)) {
            // Use Promise.all to ensure all email operations are completed before proceeding
            await Promise.all(
                emails.map(async (email: string) => {
                    const existedUser = await db.user.findUnique({
                        where: { email },
                    });

                    // Create a new user if they don't exist
                    if (!existedUser) {
                        const addUser = await db.user.create({
                            data: {
                                id: nanoid(11),
                                email,
                                username: email,
                                userId: nanoid(11),
                            },
                        });

                        const existedWorkspace = await db.workspace.findFirst({
                            where: {
                                id: workspaceId,
                                members: {
                                    some: {
                                        userId: addUser.id,
                                    },
                                },
                            },
                        });

                        // Add the new user to the workspace if not already a member
                        if (!existedWorkspace) {
                            await db.workspace.update({
                                where: { id: workspaceId },
                                data: {
                                    members: {
                                        create: [
                                            {
                                                id: nanoid(11),
                                                email: addUser.email,
                                                userId: addUser.id,
                                            },
                                        ],
                                    },
                                },
                            });
                        }
                    }

                    // Create or get conversation with the user
                    await getOrCreateConversation(user.email, email);
                })
            );
        }

        // Update workspace step after successfully creating conversations
        await db.workspace.update({
            where: { id: workspaceId },
            data: {
                step: 5,
            },
        });

        return new NextResponse("Conversations created successfully", { status: 200 });
    } catch (error) {
        console.error("[WORKSPACES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
