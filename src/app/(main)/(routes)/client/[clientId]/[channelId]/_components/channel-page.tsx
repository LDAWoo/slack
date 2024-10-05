"use client";
import { setConversations } from "@/lib/shared/conversations/conversations-slice";
import { setUser } from "@/lib/shared/user/user-slice";
import { setWorkspace } from "@/lib/shared/workspaces/workspace-slice";
import { WorkspaceWithChannelAndMember } from "@/lib/types";
import { Channel, Conversation, Member, User } from "@prisma/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChannelHeader from "./channel-header";
import { setChannel } from "@/lib/shared/channels/channel-slice";
import ChannelTab from "./channel-tab";
import { setMember } from "@/lib/shared/member/member-slice";

type ChannelPageProps = WorkspaceWithChannelAndMember & {
    user: User;
    channel: Channel | null;
    member: Member | null;
    conversations: Conversation[] | null;
};

const ChannelPage = ({ user, workspace, channel, member, conversations }: ChannelPageProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
        if (workspace) {
            dispatch(setWorkspace(workspace));
        }
        if (channel) {
            dispatch(setChannel(channel));
        }
        if (member) {
            dispatch(setMember(member));
        }
        if (conversations) {
            dispatch(setConversations(conversations));
        }
    }, [workspace, channel, user, member, conversations, dispatch]);

    return (
        <div className="bg-background-slack w-full h-full p-0 pr-1">
            <div className="relative overflow-hidden flex flex-col rounded-tr-[8px] rounded-br-[8px] bg-background w-full h-full">
                <ChannelHeader />
                <ChannelTab />
            </div>
        </div>
    );
};

export default ChannelPage;
