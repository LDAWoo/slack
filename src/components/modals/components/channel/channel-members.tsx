"use client";
import UserAvatar from "@/components/global/user-avatar";
import { UserPlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setProfile } from "@/lib/shared/profile/profile-slice";
import { MemberWithUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";
import { User } from "@prisma/client";
import { Check, ChevronDown } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import ChannelAction from "./channel-action";
import Hint from "@/components/ui/hint";
import Image from "next/image";

type ChannelMembersProps = {
    member: MemberWithUser;
    members: MemberWithUser[];
    userId: string;
};

enum MEMBER_SELECTION_TYPE {
    ALL,
    OWNER,
    MEMBER,
    GUEST,
}

const ChannelMembers = ({ members, member, userId }: ChannelMembersProps) => {
    const dispatch = useDispatch();
    const { onClose } = useModal();
    const [selectedMember, setSelectedMember] = React.useState<MEMBER_SELECTION_TYPE>(MEMBER_SELECTION_TYPE.ALL);
    const isOwner = useMemo(() => member?.role === "OWNER", [member]);

    const handleShowProfile = (user: User) => {
        dispatch(setProfile(user));
        onClose();
    };

    const handleMemberSelection = (type: MEMBER_SELECTION_TYPE) => setSelectedMember(type);

    // Mapping for member types to display in the button
    const selectedMemberLabel = useMemo(() => {
        switch (selectedMember) {
            case MEMBER_SELECTION_TYPE.ALL:
                return "Everyone";
            case MEMBER_SELECTION_TYPE.OWNER:
                return "Channel Managers";
            case MEMBER_SELECTION_TYPE.MEMBER:
                return "Members";
            case MEMBER_SELECTION_TYPE.GUEST:
                return "Guests";
            default:
                return "Everyone";
        }
    }, [selectedMember]);

    const renderDropdownItem = useCallback(
        (label: string, count: number, memberType: MEMBER_SELECTION_TYPE) => (
            <DropdownMenuItem onClick={() => handleMemberSelection(memberType)} className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                <div
                    className={cn("flex w-full items-center justify-between duration-150 gap-[8px] text-foreground group-hover:!text-white", {
                        "text-background-slack-button-active group-hover:!text-white": selectedMember === memberType,
                    })}
                >
                    {selectedMember === memberType && (
                        <span className="absolute left-1 top-[50%] -translate-y-1/2">
                            <Check size={16} />
                        </span>
                    )}
                    <span className="text-[15px] leading-[28px]">{label}</span>
                    <span>{count}</span>
                </div>
            </DropdownMenuItem>
        ),
        [selectedMember]
    );

    return (
        <Command className="w-full border-none shadow-none mt-0 pt-0 overflow-visible">
            <div className="flex items-center gap-4 w-full p-[0_28px_16px]">
                <CommandInput placeholder="Find members" className="w-full h-9" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="p-0">
                        <Button variant="outline" className="w-[70%] h-9 items-center rounded-lg justify-between p-[0_8px] border-border font-normal">
                            {selectedMemberLabel}
                            <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[322px] p-[12px_0] rounded-[8px] border-border bg-accent" side="bottom" align="end">
                        {renderDropdownItem("Everyone", 3, MEMBER_SELECTION_TYPE.ALL)}
                        {renderDropdownItem("Channel Managers", 1, MEMBER_SELECTION_TYPE.OWNER)}
                        {renderDropdownItem("Members", 1, MEMBER_SELECTION_TYPE.MEMBER)}
                        {renderDropdownItem("Guests", 0, MEMBER_SELECTION_TYPE.GUEST)}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <CommandList className="p-0">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandItem className="p-[12px_28px] !bg-background hover:!bg-accent cursor-pointer">
                    <Button className="h-9 w-9 p-0 bg-[#E0EDF2] hover:bg-[#E0EDF2] text-background-slack-button-active mr-3">
                        <UserPlusIcon size={20} />
                    </Button>
                    <span className="text-[15px] font-bold">Add people</span>
                </CommandItem>
                {members.map((member: MemberWithUser) => {
                    const isMember = member.role === "GUEST";
                    const isYourUser = member.user.id === userId;

                    return (
                        <CommandItem key={member.id} className="p-0">
                            <button onClick={() => handleShowProfile(member.user)} className="w-full flex justify-between items-center group p-[12px_28px] !bg-background hover:!bg-accent cursor-pointer">
                                <div className="flex items-center justify-center">
                                    <div className="h-9 w-9 p-0 bg-[#E0EDF2] text-background-slack-button-active mr-3">
                                        <UserAvatar src={member.user.imageUrl as string} className="w-full h-full rounded-md" />
                                    </div>
                                    <span className="text-[15px] font-bold w-fit whitespace-nowrap mr-1 text-left leading-[22px]">{`${member.user.username?.split("@")[0]} ${isYourUser ? "(you)" : ""}`}</span>
                                    <div className={cn("flex items-center justify-between ml-1")}>
                                        <span
                                            className={cn("w-[9px] h-[9px] border-2 border-foreground/50 rounded-full", {
                                                "bg-[#20A271] border-none": member.user.isOnline,
                                            })}
                                        />
                                    </div>
                                    {member.user.statusEmoji && (
                                        <Hint
                                            sideOffset={10}
                                            content={() => (
                                                <div className="flex items-center space-x-1">
                                                    <div className="relative w-4 h-4">
                                                        <Image src={member.user.statusEmoji as string} fill className="object-cover w-full h-full" alt={member.user.statusText as string} />
                                                    </div>
                                                    <span>{member.user.statusText}</span>
                                                </div>
                                            )}
                                        >
                                            <div className="relative w-4 h-4 ml-2">
                                                <Image src={member.user.statusEmoji as string} fill className="object-cover w-full h-full" alt={member.user.statusText as string} />
                                            </div>
                                        </Hint>
                                    )}
                                </div>
                                {member.role === "OWNER" && <span className="text-[13px] p-[4px_6px] rounded-full bg-accent">Channel Manager</span>}
                                {isOwner && <ChannelAction canDeletedMember={isMember} canDeleteMemberManager={isOwner && !isMember} canAssignChannelManager={isMember} />}
                            </button>
                        </CommandItem>
                    );
                })}
            </CommandList>
        </Command>
    );
};

export default React.memo(ChannelMembers);
