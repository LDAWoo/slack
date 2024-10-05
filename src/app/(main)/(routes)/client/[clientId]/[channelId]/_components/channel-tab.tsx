"use client";
import { RootState } from "@/lib/shared/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChannelTabContent from "./channel-tab-content";
import ChannelTabList from "./channel-tab-list";

const ChannelTab = () => {
    const { channel } = useSelector((state: RootState) => state.channel);
    const { member } = useSelector((state: RootState) => state.member);
    const { user } = useSelector((state: RootState) => state.user);
    const initialTab = "Messages";
    const [tab, setTab] = useState(initialTab);

    if (!channel || !member || !user) {
        return null;
    }

    return (
        <div className="w-full flex h-full">
            <div className="flex flex-col flex-[1_auto]">
                <div className="w-full p-[0_12px_0_16px] border-b border-border">
                    <div className="flex flex-row w-full bg-transparent pt-[1px]">
                        <ChannelTabList channelId={channel.id} tab={tab} onTabClick={setTab} />
                    </div>
                </div>

                <ChannelTabContent user={user} member={member} channel={channel} tab={tab} />
            </div>
        </div>
    );
};

export default ChannelTab;
