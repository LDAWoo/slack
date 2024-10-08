"use client";
import { OptionIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ChannelActionProps {
    canAssignChannelManager?: boolean;
    canDeleteMemberManager?: boolean;
    canDeletedMember: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ChannelAction = ({ canAssignChannelManager, canDeleteMemberManager, canDeletedMember, onEdit, onDelete }: ChannelActionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={cn("items-center absolute flex top-1/2 -translate-y-1/2 right-5 bg-background shadow-sm border border-border rounded-lg", isOpen ? "!opacity-100 visible" : "invisible opacity-0 group-hover:visible group-hover:opacity-100")}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild className="p-0">
                    <Button className="size-7 p-0 rounded-lg text-muted-foreground" variant={"ghost"}>
                        <OptionIcon size={18} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] p-[12px_0] rounded-[8px] border-border bg-accent" side="left" align="start" alignOffset={-10} sideOffset={10}>
                    {canAssignChannelManager && (
                        <DropdownMenuItem onClick={onEdit} className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                            <span className="text-[15px] group-hover:!text-white leading-[28px]">Assign Channel Manager</span>
                        </DropdownMenuItem>
                    )}

                    {canDeleteMemberManager && (
                        <DropdownMenuItem onClick={onDelete} className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                            <span className="text-[15px] group-hover:!text-white leading-[28px]">Remove from channel manager</span>
                        </DropdownMenuItem>
                    )}

                    {canDeletedMember && (
                        <DropdownMenuItem onClick={onDelete} className="p-[0_24px] w-full h-[28px] group hover:!bg-rose-600 items-center text-center rounded-none cursor-pointer m-0">
                            <span className="text-[15px] group-hover:!text-white leading-[28px] text-rose-600">Remove from channel</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ChannelAction;
