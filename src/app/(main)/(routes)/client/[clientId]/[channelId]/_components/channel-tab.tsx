"use client";
import { RootState } from "@/lib/shared/store";
import { useSelector } from "react-redux";
import ChannelTabContent from "./channel-tab-content";
import ChannelTabList from "./channel-tab-list";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setChannelNavigation } from "@/lib/shared/channel-navigation/channel-navigation-slice";

const ChannelTab = () => {
    const dispatch = useDispatch();
    const { channel } = useSelector((state: RootState) => state.channel);
    const { member } = useSelector((state: RootState) => state.member);
    const { user } = useSelector((state: RootState) => state.user);
    const { tab, data } = useSelector((state: RootState) => state.channelNavigation);

    useEffect(() => {
        if (data?.messageId) {
            const messageElement = document.getElementById(`message-${data?.messageId}`);
            if (messageElement) {
                messageElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
                messageElement.classList.add("bg-[rgba(242,199,68,0.2)]");
                setTimeout(() => {
                    messageElement.classList.remove("bg-[rgba(242,199,68,0.2)]");
                    dispatch(
                        setChannelNavigation({
                            tab: "Messages",
                            data: {
                                messageId: "",
                            },
                        })
                    );
                }, 3000);
            }
        }
    }, [data?.messageId]);

    if (!channel || !member || !user) {
        return null;
    }

    return (
        <div className="w-full flex h-[calc(100%_-_49px)]">
            <div className="flex flex-col flex-[1_auto]">
                <div className="w-full p-[0_12px_0_16px] border-b border-border">
                    <div className="flex flex-row w-full bg-transparent pt-[1px]">
                        <ChannelTabList channelId={channel.id} />
                    </div>
                </div>

                <ChannelTabContent user={user} member={member} channel={channel} tab={tab as string} />
            </div>
        </div>
    );
};

export default ChannelTab;
