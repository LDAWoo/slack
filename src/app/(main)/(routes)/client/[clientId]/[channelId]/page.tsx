import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import ChannelPage from "./_components/channel-page";

interface IChannelId {
    params: {
        clientId: string;
        channelId: string;
    };
}

const ChannelId = async ({ params }: IChannelId) => {
    const user = await currentUser();

    if (!user) return redirect("/authentication");

    const workspace = await db.workspace.findFirst({
        where: {
            id: params.clientId,
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

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
            workspaceId: workspace?.id,
        },
    });

    const member = await db.member.findFirst({
        where: {
            userId: user.id,
            workspaceId: workspace?.id,
        },
    });

    const conversations = await db.conversation.findMany({
        where: {
            memberOneEmail: user.email,
        },
        include: {
            memberOne: {
                include: {
                    user: true,
                },
            },
            memberTwo: {
                include: {
                    user: true,
                },
            },
        },
    });

    return <ChannelPage workspace={workspace} user={user} channel={channel} member={member} conversations={conversations} />;
};

export default ChannelId;
