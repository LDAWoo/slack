"use client";
import { RootState } from "@/lib/shared/store";
import { Channel, Member, Pipeline, User } from "@prisma/client";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";

const ChannelInput = dynamic(() => import("./channel-input"), { ssr: false });
const ChannelMessage = dynamic(() => import("./channel-message"), { ssr: false });
const ChannelMessagePin = dynamic(() => import("./channel-message-pin"), { ssr: false });

interface IChannelTabContent {
    user: User;
    member: Member;
    channel: Channel & { pipelines: Pipeline[] };
    tab: string;
}

const ChannelTabContent = React.memo(({ user, member, channel, tab }: IChannelTabContent) => {
    const renderContent = () => {
        switch (tab) {
            case "Messages":
                return (
                    <div className="mt-0 flex flex-col flex-[1_auto] h-full data-[state=inactive]:hidden">
                        <div className="flex-[1] min-h-0 relative">
                            <div className="absolute overflow-hidden w-full h-auto top-0 bottom-0">
                                <ChannelMessage
                                    type="channel"
                                    user={user}
                                    channelId={channel.id}
                                    member={member}
                                    apiUrl="/api/messages"
                                    socketUrl="/api/socket/messages"
                                    socketQuery={{
                                        channelId: channel.id,
                                        workspaceId: channel.workspaceId,
                                    }}
                                    paramValue={channel.id}
                                    paramKey="channelId"
                                />
                            </div>
                        </div>
                        <ChannelInput
                            type="channel"
                            apiUrl="/api/socket/messages"
                            query={{
                                channelId: channel.id,
                                workspaceId: channel.workspaceId,
                            }}
                        />
                    </div>
                );
            case "Files":
                return (
                    <div className="mt-0 flex flex-col flex-[1_auto] h-full data-[state=inactive]:hidden">
                        <div>Files</div>
                    </div>
                );

            case "Pins":
                return (
                    <div className="mt-0 flex flex-col flex-[1_auto] h-full data-[state=inactive]:hidden bg-accent">
                        <ChannelMessagePin
                            type="channel"
                            user={user}
                            channelId={channel.id}
                            member={member}
                            apiUrl="/api/messages"
                            socketUrl="/api/socket/messages"
                            socketQuery={{
                                channelId: channel.id,
                                workspaceId: channel.workspaceId,
                            }}
                            paramValue={channel.id}
                            paramKey="channelId"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return renderContent();
});

ChannelTabContent.displayName = "ChannelContent";

export default ChannelTabContent;
