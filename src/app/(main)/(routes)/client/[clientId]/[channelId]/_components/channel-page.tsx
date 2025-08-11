"use client";
import SlipPaneCustom from "@/components/global/slip-pane-custom";
import { useMemberSocket } from "@/hooks/use-member-socket";
import { useGetChannelQuery } from "@/lib/shared/channel/channel-api";
import { RootState } from "@/lib/shared/store";
import { useGetWorkspaceQuery } from "@/lib/shared/workspace/workspace-api";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import ChannelHeader from "./channel-header";
import ChannelProfileUser from "./channel-profile-user";

const ChannelTab = dynamic(() => import("./channel-tab"), {
    ssr: false,
});

type ChannelPageProps = {
    user: User;
    clientId: string;
    channelId: string;
};

const ChannelPage = ({ user, clientId, channelId }: ChannelPageProps) => {
    const { profile } = useSelector((state: RootState) => state.profile);
    const { data: workspaceData, isLoading: workspaceLoading } = useGetWorkspaceQuery(clientId as string);
    const { data: channelData, isLoading: channelLoading } = useGetChannelQuery({
        channelId,
        workspaceId: clientId,
    });

    const workspace = workspaceData?.workspace;
    const channel = channelData?.channel;

    const addKey = `member:${workspace?.id}`;
    const updateKey = `member:${workspace?.id}:update`;
    const queryKey = `member:${workspace?.id}`;

    // useConnection({
    //     workspaceId: workspace?.id as string,
    //     memberId: member?.id as string,
    // });

    useMemberSocket({
        addKey,
        queryKey,
        updateKey,
    });

    if (workspaceLoading || channelLoading) {
        return null;
    }

    if (!workspace || !channel) {
        return redirect("/");
    }

    return (
        <div className="bg-background-slack w-full h-full p-0 pr-1">
            <div className="relative overflow-hidden flex rounded-tr-[8px] rounded-br-[8px] bg-background w-full h-full">
                <SlipPaneCustom
                    resizer={Object.keys(profile || {}).length > 0}
                    initialWidthPanel1={306}
                    initialWidthPanel2={260}
                    panel1={() => (
                        <div className="w-full h-full">
                            <ChannelHeader workspace={workspace} channel={channel} user={user} />
                            <ChannelTab workspace={workspace} channel={channel} user={user} />
                        </div>
                    )}
                    panel2={() => <ChannelProfileUser user={user} clientId={clientId} />}
                />
            </div>
        </div>
    );
};

export default ChannelPage;
