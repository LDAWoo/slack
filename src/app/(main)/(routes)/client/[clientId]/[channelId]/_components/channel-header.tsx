"use client";
import UserAvatar from "@/components/global/user-avatar";
import { PrefixIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Hint from "@/components/ui/hint";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RootState } from "@/lib/shared/store";
import { useModal } from "@/providers/modal-provider";
import { EllipsisVertical } from "lucide-react";
import { useSelector } from "react-redux";

const ChannelHeader = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const { channel } = useSelector((state: RootState) => state.channel);
    const { member } = useSelector((state: RootState) => state.member);
    const { workspace } = useSelector((state: RootState) => state.workspace);
    const { onOpen } = useModal();

    if (!channel || !member || !workspace) {
        return null;
    }

    const handleOpenChannelModal = () => {
        onOpen("channelModal", {
            apiUrl: "/api/members",
            workspace,
            channel,
            member,
            user,
        });
    };

    return (
        <div className="pr-3 pl-[20px] h-[49px] flex items-center">
            <div className="flex flex-1 items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={"ghost"} className="items-center min-w-[96px] p-[3px_8px] rounded-[6px] h-[30px] font-extrabold text-lg mr-2">
                                <PrefixIcon size={20} className="mr-[2px]" />
                                <span className="text-lg leading-[1.33334]">{channel?.name}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Get channel information</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex gap-2 ml-auto items-center">
                <Hint
                    side="bottom"
                    content={() => (
                        <div className="flex flex-col gap-1 items-center w-full text-center">
                            <div className="text-[13px] font-bold text-background">View all members of this channel</div>
                            <div>
                                <div className="text-[13px] font-bold text-background/75 break-words">Includes</div>
                                {workspace.members.map((member) => (
                                    <div key={member.id} className="text-[13px] font-bold text-background/70 break-words">
                                        {member.user.username?.split("@")[0]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    className="p-[8px_12px_10px] w-[150px]"
                >
                    <button onClick={handleOpenChannelModal} className="flex flex-row items-center p-[3px] border border-border rounded-[8px] bg-background hover:opacity-70">
                        {workspace.members.map((member, index) => (
                            <div
                                key={member.id}
                                className="relative h-[20px]"
                                style={{
                                    zIndex: 5 - index,
                                }}
                            >
                                <div
                                    className="w-5 h-5 shadow-[0_0_0_2px_rgba(255,255,255,1)] rounded-[6px] overflow-hidden"
                                    style={{
                                        marginRight: `-${0 - index + 5}px`,
                                    }}
                                >
                                    <UserAvatar src={member.user.imageUrl} className="w-5 h-5 rounded-[6px]" />
                                </div>
                            </div>
                        ))}
                        <span className="leading-[22px] pr-[6px] pl-3 text-[13px] font-bold">{workspace.members.length}</span>
                    </button>
                </Hint>

                <Hint content={"Other actions"} side="bottom" align="end" arrowAlign="end" isPortal alignOffset={-3.5}>
                    <Button variant={"ghost"} className="h-[30px] w-[30px] p-[3px] !rounded-[8px]">
                        <EllipsisVertical size={18} />
                    </Button>
                </Hint>
            </div>
        </div>
    );
};

export default ChannelHeader;
