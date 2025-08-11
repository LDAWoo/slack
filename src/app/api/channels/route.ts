import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);
        const { name, step } = await req.json();
        const workspaceId = searchParams.get("workspaceId");

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!workspaceId) {
            return new NextResponse("Missing workspaceId", {
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
                step,
                channels: {
                    create: [
                        {
                            id: nanoid(11),
                            name,
                            userId: user.id,
                            pipelines: {
                                create: [
                                    {
                                        id: nanoid(11),
                                        name: "Messages",
                                        order: 0,
                                    },
                                    {
                                        id: nanoid(11),
                                        name: "Files",
                                        order: 1,
                                    },
                                    {
                                        id: nanoid(11),
                                        name: "Pins",
                                        order: 2,
                                        status: "INACTIVE",
                                    },
                                ],
                            },
                        },
                        {
                            id: nanoid(11),
                            name: "social",
                            userId: user.id,
                            pipelines: {
                                create: [
                                    {
                                        id: nanoid(11),
                                        name: "Messages",
                                        order: 0,
                                    },
                                    {
                                        id: nanoid(11),
                                        name: "Files",
                                        order: 1,
                                    },
                                    {
                                        id: nanoid(11),
                                        name: "Pins",
                                        order: 2,
                                        status: "INACTIVE",
                                    },
                                ],
                            },
                        },
                        {
                            id: nanoid(11),
                            name: "all-members-of-new-workspace",
                            userId: user.id,
                            pipelines: {
                                create: [
                                    {
                                        id: nanoid(11),
                                        name: "Messages",
                                        order: 0,
                                    },
                                    {
                                        id: nanoid(11),
                                        name: "Files",
                                        order: 1,
                                    },
                                    {
                                        id: nanoid(11),
                                        name: "Pins",
                                        order: 2,
                                        status: "INACTIVE",
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.log("[CHANNELS_POST]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
