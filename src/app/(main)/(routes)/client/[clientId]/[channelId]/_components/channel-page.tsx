"use client";
import SlipPaneCustom from "@/components/global/slip-pane-custom";
import { setChannel } from "@/lib/shared/channels/channel-slice";
import { setConversations } from "@/lib/shared/conversations/conversations-slice";
import { setMember } from "@/lib/shared/member/member-slice";
import { RootState } from "@/lib/shared/store";
import { setUser } from "@/lib/shared/user/user-slice";
import { setWorkspace } from "@/lib/shared/workspaces/workspace-slice";
import { WorkspaceWithChannelAndMember } from "@/lib/types";
import { Channel, Conversation, Member, User } from "@prisma/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelHeader from "./channel-header";
import ChannelProfileUser from "./channel-profile-user";
import ChannelTab from "./channel-tab";
import { useConnection } from "@/hooks/use-connection";
import { useMemberSocket } from "@/hooks/use-member-socket";

type ChannelPageProps = WorkspaceWithChannelAndMember & {
    user: User;
    channel: Channel | null;
    member: Member | null;
    conversations: Conversation[] | null;
};

const ChannelPage = ({ user, workspace, channel, member, conversations }: ChannelPageProps) => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.profile);

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

    const addKey = `member:${workspace?.id}`;
    const updateKey = `member:${workspace?.id}:update`;
    const queryKey = `member:${workspace?.id}`;

    useConnection({
        workspaceId: workspace?.id as string,
        memberId: member?.id as string,
    });

    useMemberSocket({
        addKey,
        queryKey,
        updateKey,
    });

    return (
        <div className="bg-background-slack w-full h-full p-0 pr-1">
            <div className="relative overflow-hidden flex rounded-tr-[8px] rounded-br-[8px] bg-background w-full h-full">
                <SlipPaneCustom
                    resizer={Object.keys(profile || {}).length > 0}
                    initialWidthPanel1={306}
                    initialWidthPanel2={260}
                    panel1={() => (
                        <div className="w-full h-full">
                            <ChannelHeader />
                            <ChannelTab />
                        </div>
                    )}
                    panel2={() => <ChannelProfileUser />}
                />
            </div>
        </div>
    );
};

export default ChannelPage;
