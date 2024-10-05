"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageQuery } from "@/hooks/use-message-query";
import { Member, User } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import React from "react";
import ChannelMessagePinItem from "./channel-message-pin-item";
import { useMessageSocket } from "@/hooks/use-message-socket";

interface ChannelMessagePin {
    user: User;
    member: Member;
    channelId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramValue: string;
    paramKey: "channelId" | "conversationId";
    type: "channel" | "conversation";
}

const ChannelMessagePin = ({ user, member, channelId, apiUrl, socketUrl, socketQuery, paramValue, paramKey, type }: ChannelMessagePin) => {
    const queryKey = `chat:${channelId}`;
    const addKey = `chat:${channelId}:messages`;
    const updateKey = `chat:${channelId}:messages:update`;

    const { messages, status } = useMessageQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    useMessageSocket({
        queryKey,
        addKey,
        updateKey,
    });

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading messages...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Something went wrong!</p>
            </div>
        );
    }

    const messagePins = messages.pages[0].messages.filter((message) => message.pin);

    if (!messagePins) {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="flex flex-col m-[15vh_12px] gap-1">
                    <div className="text-lg leading-[22px] font-extrabold text-foreground">Easily access your important messages</div>
                    <div className="text-[15px] text-foreground/70">Right-click on a message to pin it to the channel.</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col p-[16px_24px] gap-2 w-full">
                <div>
                    <span className="text-[13px] font-semibold text-[#1d1c1d83]">Pinned Posts</span>
                </div>
                <ScrollArea>
                    <div className="w-full h-full flex flex-col gap-2">
                        {messagePins.map((message) => (
                            <ChannelMessagePinItem key={message.id} id={message.id} socketUrl={socketUrl} socketQuery={socketQuery} user={user} currentMember={member} member={message.member} message={message} reactions={message.reactions} pin={message.pin} body={message.content} createdAt={message.createdAt} updatedAt={message.updatedAt} isUpdated={message.createdAt !== message.updatedAt} deleted={message.deleted} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default ChannelMessagePin;
