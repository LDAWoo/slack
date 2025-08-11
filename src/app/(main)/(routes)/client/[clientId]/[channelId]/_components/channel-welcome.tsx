"use client";
import { PrefixIcon, UserPlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useGetChannelQuery } from "@/lib/shared/channel/channel-api";
import { useParams } from "next/navigation";

const ChannelWelcome = () => {
    const params = useParams<{ clientId: string; channelId: string }>();
    const clientId = params?.clientId as string;
    const channelId = params?.channelId as string;

    const { data, isLoading } = useGetChannelQuery({
        channelId,
        workspaceId: clientId,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const channel = data?.channel;

    return (
        <div className="m-[48px_20px_16px]">
            <span className="text-[28px] font-extrabold">
                📣 {"You are watching the channel"} {channel?.name}
                <span className="inline-flex translate-y-[3px]">
                    <PrefixIcon className="h-[28px] w-[28px]" />
                </span>
            </span>
            <div className="text-[15px] leading-[1.46668] text-muted-foreground">
                <span>Share announcements and updates about company news, upcoming events, or teammates who deserve to be recognized. ⭐</span>
                <Button className="h-auto inline-flex p-0 text-[#0B4C8C] font-normal" variant={"link"}>
                    Edit description
                </Button>
            </div>

            <div className="mt-[8px]">
                <Button className="h-[28px] p-[0_12px] border-border" variant={"outline"}>
                    <UserPlusIcon className="w-[14px] h-[14px] mr-1" />
                    Add colleagues
                </Button>
            </div>
        </div>
    );
};

export default ChannelWelcome;
