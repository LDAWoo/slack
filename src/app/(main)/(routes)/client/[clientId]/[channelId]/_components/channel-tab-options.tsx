"use client";
import { BookMarkIcon, CanvasIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModal } from "@/providers/modal-provider";
import { Plus } from "lucide-react";
import React, { memo } from "react";
import { LuListChecks } from "react-icons/lu";

const ChannelTabOptions = () => {
    const { onOpen } = useModal();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="p-0">
                <Button className="p-0 rounded-full w-7 h-7" variant={"ghost"}>
                    <Plus size={18} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-[12px_0] rounded-[8px] border-border bg-accent" side="bottom" align="start" sideOffset={5} alignOffset={-6}>
                <DropdownMenuItem
                    onClick={() => {
                        onOpen("canvasModal");
                    }}
                    className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0"
                >
                    <div className="flex items-center gap-[8px] text-foreground/80 group-hover:!text-white">
                        <CanvasIcon size={20} />
                        <span className="text-[15px] leading-[28px]">Canvas</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                    <div className="flex items-center gap-[8px] text-foreground/80 group-hover:!text-white">
                        <LuListChecks size={20} />
                        <span className="text-[15px] leading-[28px]">List</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                    <div className="flex items-center gap-[8px] text-foreground/80 group-hover:!text-white">
                        <BookMarkIcon size={20} />
                        <span className="text-[15px] leading-[28px]">Bookmark</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                    <div className="flex items-center gap-[8px] text-foreground/80 group-hover:!text-white">
                        <span className="text-[15px] leading-[28px]">Edit Tabs</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default memo(ChannelTabOptions);
