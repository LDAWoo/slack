"use client";
import { useMemberQuery } from "@/hooks/use-member-query";
import { setProfile } from "@/lib/shared/profile/profile-slice";
import { MemberWithUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";
import { User } from "@prisma/client";
import axios from "axios";
import { Check, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiStar, PiStarFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import UserAvatar from "../global/user-avatar";
import { PrefixIcon, UserPlusIcon } from "../icons";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ChannelAction from "./components/channel/channel-action";
import ChannelTabs from "./components/channel/channel-tabs";

const ChannelModal = () => {
    const dispatch = useDispatch();
    const { isOpen, type, data, onClose } = useModal();
    const params = useParams();
    const { channelId } = params as {};
    const { members } = useMemberQuery();

    const [isLoading, setIsLoading] = useState(false);

    const { query, user, channel, member } = data;

    const isModalOpen = isOpen && data && type === "channelModal";

    if (!isModalOpen) {
        return null;
    }

    console.log(members);

    const onDelete = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/members",
                query,
            });
            setIsLoading(true);
            await axios.delete(url);
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowProfile = (user: User) => {
        dispatch(setProfile(user));
        onClose();
    };

    const isFavorite = true;
    const selectedMember = "all";

    const isOwner = member?.role === "OWNER";

    if (!members) return;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="w-[580px] max-w-[580px] bg-background gap-0 shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[6px]">
                <DialogHeader className="p-[20px_28px_0_28px]">
                    <DialogTitle className="text-xl text-left font-extrabold mr-[32px]">
                        <div className="flex items-center gap-1">
                            <PrefixIcon size={22} className="inline" /> {channel?.name}
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <DropdownMenu>
                    <div className="m-[12px_20px_8px_20px]">
                        <div className="flex flex-row gap-2">
                            <DropdownMenuTrigger asChild className="p-0">
                                <Button variant={"outline"} className="p-[0_8px] h-7 border-foreground/50 gap-2">
                                    {isFavorite ? <PiStarFill size={16} className="text-background-slack-button-active" /> : <PiStar size={16} />}
                                    <MdKeyboardArrowDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[200px] p-[12px_0] rounded-[8px] border-border" side="bottom" align="start" sideOffset={-2} alignOffset={-6}>
                                <DropdownMenuItem className="!cursor-default h-[28px] p-[0_24px] hover:!bg-background">
                                    <span className="text-[13px] text-foreground/80">Move to...</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                                    <div
                                        className={cn("flex items-center gap-[8px] text-background-slack-button-active group-hover:!text-white", {
                                            "text-foreground group-hover:!text-white": !isFavorite,
                                        })}
                                    >
                                        {isFavorite && (
                                            <span className="absolute left-1 top-[50%] -translate-y-1/2">
                                                <Check size={16} />
                                            </span>
                                        )}
                                        <PiStar size={16} />
                                        <span className="text-[15px] leading-[28px]">Favorites</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                                <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                    <span className="text-[15px] group-hover:!text-white leading-[28px] whitespace-nowrap">Move to a new section</span>
                                </DropdownMenuItem>
                                {isFavorite && (
                                    <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                        <span className="text-[15px] group-hover:!text-white leading-[28px] whitespace-nowrap">Remove from Favorites</span>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </div>
                    </div>
                </DropdownMenu>

                <div className="p-0">
                    <Tabs defaultValue="members">
                        <TabsList className="p-[0_20px] border-b border-border bg-background w-full justify-start">
                            <TabsTrigger value="about" className="mr-5 ml-0 cursor-pointer flex items-center font-bold w-fit !text-foreground relative gap-1 p-0 h-[36px] shadow-none rounded-none [&[data-state=active]>#about-line]:block">
                                <span className="text-[13px]">About</span>
                                <span className={cn("absolute -bottom-[1px] left-0 bg-background-slack w-full h-[2px] hidden")} id="about-line" />
                            </TabsTrigger>

                            <TabsTrigger value="members" className="mr-5 ml-[8px] cursor-pointer flex items-center font-bold w-fit !text-foreground relative gap-1 p-0 h-[36px] shadow-none rounded-none [&[data-state=active]>#member-line]:block">
                                <span className="text-[13px]">Members {members.length}</span>
                                <span className={cn("absolute -bottom-[1px] left-0 bg-background-slack w-full h-[2px] hidden")} id="member-line" />
                            </TabsTrigger>

                            <TabsTrigger value="tabs" className="mr-5 ml-[8px] cursor-pointer flex items-center font-bold w-fit !text-foreground relative gap-1 p-0 h-[36px] shadow-none rounded-none [&[data-state=active]>#tabs-line]:block">
                                <span className="text-[13px]">Tabs</span>
                                <span className={cn("absolute -bottom-[1px] left-0 bg-background-slack w-full h-[2px] hidden")} id="tabs-line" />
                            </TabsTrigger>

                            <TabsTrigger value="settings" className="mr-5 ml-[8px] cursor-pointer flex items-center font-bold w-fit !text-foreground relative gap-1 p-0 h-[36px] shadow-none rounded-none [&[data-state=active]>#settings-line]:block">
                                <span className="text-[13px]">Settings</span>
                                <span className={cn("absolute -bottom-[1px] left-0 bg-background-slack w-full h-[2px] hidden")} id="settings-line" />
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="members" className="p-[16px_0_0_0] mt-0">
                            <Command className="w-full border-none shadow-none mt-0 pt-0 overflow-visible">
                                <div className="flex items-center gap-4 w-full p-[0_28px_16px] ">
                                    <CommandInput placeholder="Find members" className="w-full h-9" />

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="p-0">
                                            <Button variant={"outline"} className="w-[70%] h-9 items-center rounded-lg justify-between p-[0_8px] border-border overflow-visible focus-within:shadow-focus-border font-normal">
                                                Everyone
                                                <ChevronDown size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[322px] p-[12px_0] rounded-[8px] border-border bg-accent" side="bottom" align="end" sideOffset={-2} alignOffset={-6}>
                                            <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                                                <div
                                                    className={cn("flex w-full items-center justify-between gap-[8px] text-foreground  group-hover:!text-white", {
                                                        "text-background-slack-button-active group-hover:!text-white": selectedMember === "all",
                                                    })}
                                                >
                                                    {selectedMember === "all" && (
                                                        <span className="absolute left-1 top-[50%] -translate-y-1/2">
                                                            <Check size={16} />
                                                        </span>
                                                    )}
                                                    <span className="text-[15px] leading-[28px]">Everyone</span>
                                                    <span>3</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                                                <div
                                                    className={cn("flex w-full items-center justify-between gap-[8px] text-foreground  group-hover:!text-white", {
                                                        "text-background-slack-button-active group-hover:!text-white": selectedMember === "owner",
                                                    })}
                                                >
                                                    {selectedMember === "owner" && (
                                                        <span className="absolute left-1 top-[50%] -translate-y-1/2">
                                                            <Check size={16} />
                                                        </span>
                                                    )}
                                                    <span className="text-[15px] leading-[28px]">Channel Managers</span>
                                                    <span>1</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                                                <div
                                                    className={cn("flex w-full items-center justify-between gap-[8px] text-foreground  group-hover:!text-white", {
                                                        "text-background-slack-button-active group-hover:!text-white": selectedMember === "member",
                                                    })}
                                                >
                                                    {selectedMember === "member" && (
                                                        <span className="absolute left-1 top-[50%] -translate-y-1/2">
                                                            <Check size={16} />
                                                        </span>
                                                    )}
                                                    <span className="text-[15px] leading-[28px]">Members</span>
                                                    <span>1</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0">
                                                <div
                                                    className={cn("flex w-full items-center text-foreground justify-between gap-[8px] group-hover:!text-white", {
                                                        "text-background-slack-button-active group-hover:!text-white": selectedMember === "guest",
                                                    })}
                                                >
                                                    {selectedMember === "guest" && (
                                                        <span className="absolute left-1 top-[50%] -translate-y-1/2">
                                                            <Check size={16} />
                                                        </span>
                                                    )}
                                                    <span className="text-[15px] leading-[28px]">Guests</span>
                                                    <span>0</span>
                                                </div>
                                            </DropdownMenuItem>
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
                                        const isYourUser = member.user.id === user.id;
                                        return (
                                            <CommandItem key={member.id} className="p-0">
                                                <button onClick={() => handleShowProfile(member.user)} className="w-full flex items-center relative group p-[12px_28px] !bg-background hover:!bg-accent cursor-pointer">
                                                    <div className="h-9 w-9 p-0 bg-[#E0EDF2] hover:bg-[#E0EDF2] text-background-slack-button-active mr-3">
                                                        <UserAvatar src={member.user.imageUrl as string} className="w-full h-full rounded-md" />
                                                    </div>
                                                    <span className="text-[15px] font-bold flex-1 whitespace-nowrap mr-1">{`${member.user.username?.split("@")[0]} ${isYourUser ? "(you)" : ""} `}</span>
                                                    <div
                                                        className={cn("flex flex-row items-center justify-between flex-grow-[4]", {
                                                            "flex-grow-[5]": isOwner,
                                                        })}
                                                    >
                                                        <span
                                                            className={cn("w-[9px] h-[9px] border-2 border-foreground/50 rounded-full overflow-hidden bg-transparent", {
                                                                "bg-[#20A271]  border-none": member.user.isOnline,
                                                            })}
                                                        />
                                                        {member.role === "OWNER" && <span className="text-[13px] p-[4px_6px] rounded-full bg-accent">Channel Manager</span>}
                                                    </div>
                                                    {isOwner && <ChannelAction canDeletedMember={isMember} canDeleteMemberManager={isOwner && !isMember} canAssignChannelManager={isMember} />}
                                                </button>
                                            </CommandItem>
                                        );
                                    })}
                                </CommandList>
                            </Command>
                        </TabsContent>

                        <TabsContent value="tabs" className="p-0 mt-0">
                            <ChannelTabs channelId={channelId} />
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChannelModal;
