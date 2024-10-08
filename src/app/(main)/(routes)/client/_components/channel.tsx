"use client";
import React from "react";

import { ChevronDown } from "lucide-react";

import { PrefixIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/shared/store";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { TiArrowSortedUp } from "react-icons/ti";
import { useSelector } from "react-redux";

const Channel = () => {
    const params = useParams();
    const channelId = params?.channelId as string | undefined;

    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const { workspace } = useSelector((state: RootState) => state.workspace);

    const channels = workspace?.channels ?? [];
    const selectedChannel = channels.find((c) => c.id === channelId);

    const handleChannelClick = React.useCallback(
        (channelId: string) => {
            router.push(`/client/${workspace?.id}/${channelId}`);
        },
        [workspace, router]
    );

    const getChannelClassNames = (id: string) =>
        cn("relative cursor-pointer h-[28px] whitespace-nowrap overflow-hidden text-ellipsis rounded-[6px] p-[0_10px_0_16px] hover:bg-background-slack-active text-foreground-slack-secondary", {
            "bg-[rgba(249,237,255,1)] text-foreground-slack hover:bg-[rgba(249,237,255,1)]": id === channelId,
        });

    return (
        <DropdownMenu>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
                <div className="flex items-center h-[28px] p-[0_16px] m-[0_8px] w-auto group">
                    <CollapsibleTrigger asChild aria-expanded={isOpen} className="[&[data-state=open]>svg]:rotate-180">
                        <Button className="hover:bg-background-slack-active text-foreground-slack-secondary bg-transparent h-[26px] w-[26px] p-0">
                            <TiArrowSortedUp id="arrow-collapsible" className="h-4 w-4 rotate-90" />
                        </Button>
                    </CollapsibleTrigger>
                    <DropdownMenuTrigger className="hover:bg-background-slack-active h-[28px] p-[0_8px] rounded-[6px] data-[state=closed]:outline-none">
                        <span className="flex items-center text-foreground-slack-secondary text-[15px] font-semibold">
                            Channels
                            <ChevronDown className="h-4 w-4 ml-1 hidden group-hover:flex" />
                        </span>
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent side="bottom" align="start" sideOffset={4} className="shadow-[0_0_0_1px_#00000027] border-none w-[300px] p-[12px_0] rounded-[8px]">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="p-[0_24px] w-full h-[28px] hover:!bg-background-slack-button-active hover:!text-white items-center text-center rounded-none cursor-pointer m-0">
                            <div className="p-0">
                                <span className="text-base leading-[28px]">Create</span>
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent alignOffset={-12} sideOffset={-2} className="shadow-[0_0_0_1px_#00000027] border-none p-[12px_0] w-[260px] rounded-[8px]">
                                <DropdownMenuItem className="p-[0_24px] w-full h-[28px] hover:!bg-background-slack-button-active hover:!text-white items-center text-center rounded-none cursor-pointer m-0">
                                    <span className="text-base leading-[28px]">Create a channel</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-[0_24px] w-full h-[28px] hover:!bg-background-slack-button-active hover:!text-white items-center text-center rounded-none cursor-pointer m-0">
                                    <span className="text-base leading-[28px]">Create a sidebar section</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator className="my-[8px] bg-border" />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="p-[0_24px] w-full h-[28px] hover:!bg-background-slack-button-active hover:!text-white items-center text-center rounded-none cursor-pointer m-0">
                            <div className="p-0">
                                <span className="text-base leading-[28px]">Manage</span>
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent alignOffset={-12} sideOffset={-2} className="shadow-[0_0_0_1px_#00000027] border-none p-[12px_0] w-[260px] rounded-[8px]">
                                <DropdownMenuItem className="p-[0_24px] w-full h-[28px] hover:!bg-background-slack-button-active hover:!text-white items-center text-center rounded-none cursor-pointer m-0">
                                    <span className="text-base leading-[28px]">Browser channels</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
                {selectedChannel && !isOpen && (
                    <div className="p-[0_8px] h-[28px] w-full !mt-0">
                        <div className={getChannelClassNames(selectedChannel.id)}>
                            <div className="absolute w-7 h-7 flex items-center justify-center">
                                <PrefixIcon className="w-4 h-4" />
                            </div>
                            <span className="pl-7 text-[15px] leading-[28px]">{selectedChannel.name}</span>
                        </div>
                    </div>
                )}
                <CollapsibleContent className="space-y-0 !mt-0" id="channels-list">
                    {channels.map((channel) => (
                        <div className="p-[0_8px] h-[28px] w-full" key={channel.id}>
                            <div aria-label={channel.id} className={getChannelClassNames(channel.id)} onClick={() => handleChannelClick(channel.id)}>
                                <div className="absolute w-7 h-7 flex items-center justify-center">
                                    <PrefixIcon className="w-4 h-4" />
                                </div>
                                <span className="pl-7 text-[15px] leading-[28px]">{channel.name}</span>
                            </div>
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </DropdownMenu>
    );
};

export default Channel;
