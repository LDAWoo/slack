"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageQuery } from "@/hooks/use-message-query";
import { useMessageSocket } from "@/hooks/use-message-socket";
import { useMessageScroll } from "@/hooks/use-message.scroll";
import { MessageWithMemberWithUser } from "@/lib/types";
import { Member, Message, User } from "@prisma/client";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, memo, useRef } from "react";
import ChannelMessageItem from "./channel-message-item";
import ChannelWelcome from "./channel-welcome";

const TIME_THRESHOLD = 5;
interface IChannelMessage {
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

const formatDateLabel = (date: string) => {
    const data = new Date(date);

    if (isToday(date)) {
        return "Today";
    }
    if (isYesterday(date)) {
        return "Yesterday";
    }

    return format(data, "EEEE, MMMM d");
};

const ChannelMessage = ({ user, member, channelId, apiUrl, socketUrl, socketQuery, paramValue, paramKey, type }: IChannelMessage) => {
    const queryKey = `chat:${channelId}`;
    const addKey = `chat:${channelId}:messages`;
    const updateKey = `chat:${channelId}:messages:update`;

    const messageRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const { messages, hasNextPage, fetchNextPage, isFetchingNextPage, status } = useMessageQuery({
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

    useMessageScroll({
        messageRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: messages?.pages?.[0]?.items?.length ?? 0,
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

    const groupedMessages = (messageArray: Message[]) => {
        return messageArray.reduce((groups, message) => {
            const timestamp = new Date(message.createdAt);
            const dateKey = format(timestamp, "yyyy-MM-dd");
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].unshift(message);
            return groups;
        }, {} as Record<string, Message[]>);
    };

    return (
        <ScrollArea ref={messageRef} className="flex flex-col py-4 overflow-y-auto h-full p-0">
            {!hasNextPage && <div className="flex-1"></div>}
            <ChannelWelcome />

            <div className="flex flex-col-reverse mt-auto">
                {messages?.pages?.map((group, index) => (
                    <Fragment key={index}>
                        {Array.isArray(group.messages) &&
                            Object.entries(groupedMessages(group.messages)).map(([dateKey, messages], index) => (
                                <div key={index}>
                                    <div className="text-center my-3 relative">
                                        <hr className="absolute top-1/2 left-0 right-0 border-t border-border" />
                                        <span className="relative inline-block bg-background px-4 py-1 rounded-full text-[13px] border font-bold border-border shadow-sm">{formatDateLabel(dateKey)}</span>
                                    </div>
                                    {messages.map((message: MessageWithMemberWithUser, index) => {
                                        const prevMessage = messages[index - 1];
                                        const isCompact = prevMessage && prevMessage.member.user.id === message.member.user.id && differenceInMinutes(new Date(message.createdAt), new Date(prevMessage.createdAt)) < TIME_THRESHOLD;

                                        return <ChannelMessageItem key={message.id} id={message.id} socketUrl={socketUrl} socketQuery={socketQuery} user={user} currentMember={member} member={message.member} message={message} reactions={message.reactions} pin={message.pin} body={message.content} createdAt={message.createdAt} updatedAt={message.updatedAt} isCompact={isCompact} isUpdated={message.createdAt !== message.updatedAt} deleted={message.deleted} />;
                                    })}
                                </div>
                            ))}
                    </Fragment>
                ))}
            </div>

            <div ref={bottomRef} />
        </ScrollArea>
    );
};

export default memo(ChannelMessage);
