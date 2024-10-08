"use client";
import UserAvatar from "@/components/global/user-avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Hint from "@/components/ui/hint";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { clearProfile } from "@/lib/shared/profile/profile-slice";
import { RootState } from "@/lib/shared/store";
import { cn } from "@/lib/utils";
import { Clock3Icon, EllipsisVertical, Mail, Plus, X } from "lucide-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TbHeadphones } from "react-icons/tb";
import { MessageIcon } from "@/components/icons";
import { useMemberQuery } from "@/hooks/use-member-query";
import { MemberWithUser } from "@/lib/types";
import { format } from "date-fns";
import { useModal } from "@/providers/modal-provider";
import Image from "next/image";

const ChannelProfileUser = () => {
    const dispatch = useDispatch();
    const { onOpen } = useModal();
    const { user } = useSelector((state: RootState) => state.user);
    const { profile } = useSelector((state: RootState) => state.profile);
    const { members } = useMemberQuery();

    if (!profile || !user) return;

    const handleClose = () => {
        dispatch(clearProfile());
    };

    const member = members.find((m: MemberWithUser) => m.user.id === profile.id) as MemberWithUser;

    console.log(member);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col flex-[1_auto] w-full h-full bg-background shadow-[0_4px_#0000000d,0_0_20px_#0000001a]">
            <div className="pl-3 pr-4">
                <div className="flex items-center justify-between h-[49px]">
                    <span className="text-lg font-extrabold">Profile</span>

                    <Hint content={"Close profile"} side="bottom" align="end" arrowAlign="end" isPortal alignOffset={-2.5}>
                        <Button variant={"ghost"} className="h-[30px] w-[30px] p-[3px] !rounded-[8px]" onClick={handleClose}>
                            <X size={20} />
                        </Button>
                    </Hint>
                </div>
            </div>
            <ScrollArea className="flex-[1]">
                <div className="p-[16px_16px_0] aspect-[1/1] max-w-[288px] ml-auto mr-auto flex flex-col items-center justify-center">
                    <div className="relative w-full h-full rounded-md overflow-hidden ">
                        <UserAvatar src={profile?.imageUrl as string} alt="Avatar" className="object-cover rounded-md w-full h-full" />
                    </div>
                </div>
                <div className="p-4 flex flex-col">
                    <div>
                        <div className="flex items-center">
                            <span className="text-2xl font-black">{profile?.username?.split("@")[0]}</span>
                            {profile.id === user.id && (
                                <div className="ml-auto">
                                    <Button className="h-fit text-link text-[15px] font-bold p-0" variant={"link"}>
                                        Modifier
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex flex-row items-center mb-2">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <span
                                    className={cn(" w-[9px] h-[9px] rounded-full border-2 border-foreground/70", {
                                        "bg-[#20A271] border-none": member.user.isOnline,
                                    })}
                                />
                            </div>

                            <span className="ml-2 text-[15px]">{member.user.isOnline ? "Available" : "Absent(e)"}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2 gap-2">
                            {member.user.statusText && member.user.statusEmoji && (
                                <>
                                    <div className="flex items-center">
                                        <div className="relative w-5 h-5">
                                            <Image src={member.user.statusEmoji} alt={member.user.statusText} fill className="object-cover" />
                                        </div>

                                        <span className="ml-2 text-[15px]">{member.user.statusText}</span>
                                    </div>

                                    <Hint content={"Clear status"} side="left">
                                        <Button className="w-[15px] h-[15px] rounded-full p-0">
                                            <X size={10} />
                                        </Button>
                                    </Hint>
                                </>
                            )}
                        </div>

                        <div className="flex flex-row items-center mb-2">
                            <Clock3Icon size={18} />
                            <span className="pl-2 text-[15px]">{`${format(new Date(member.user.lastOnline), "k")} h ${format(new Date(member.user.lastOnline), "mm")} time locale`}</span>
                        </div>

                        <div className="flex flex-row items-center">
                            <>
                                {profile.id === user.id && (
                                    <>
                                        <Button
                                            onClick={() =>
                                                onOpen("statusUser", {
                                                    member,
                                                })
                                            }
                                            className="w-full min-w-[80px] text-ellipsis h-[36px] p-[0_12px] text-[15px] border-foreground/40 rounded-lg"
                                            variant={"outline"}
                                        >
                                            <span className="overflow-hidden text-ellipsis">{member.user.statusText ? "Change status" : "Set a status"}</span>
                                        </Button>

                                        <Button className="ml-2 min-w-[80px] w-full h-[36px] p-[0_12px] text-[15px] border-foreground/40 rounded-lg" variant={"outline"}>
                                            <span className="overflow-hidden text-ellipsis">Show as</span>
                                            <MdKeyboardArrowDown size={15} className="ml-2" />
                                        </Button>
                                    </>
                                )}

                                {profile.id !== user.id && (
                                    <>
                                        <Button className="w-full min-w-[80px] text-ellipsis h-[36px] p-[0_12px] text-[15px] border-foreground/40 rounded-lg" variant={"outline"}>
                                            <MessageIcon className="mr-1 min-w-[18px] max-h-[18px] w-[18px] h-[18px]" />
                                            <span className="overflow-hidden text-ellipsis">Message</span>
                                        </Button>

                                        <Button className="ml-2 min-w-[80px] w-full h-[36px] p-[0_12px] text-[15px] border-foreground/40 rounded-lg" variant={"outline"}>
                                            <div className="flex gap-1 items-center relative w-full justify-center">
                                                <TbHeadphones className="min-w-[18px] max-h-[18px] w-[18px] h-[18px]" />
                                                <span className="overflow-hidden text-ellipsis pr-[18px]">Team call</span>
                                                <MdKeyboardArrowDown size={15} className="absolute right-0" />
                                            </div>
                                        </Button>
                                    </>
                                )}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="p-0">
                                        <Button className="ml-2 h-[36px] p-[0_6px] text-[15px] border-foreground/40 rounded-lg" variant={"outline"}>
                                            <EllipsisVertical size={22} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[300px] p-[12px_0] rounded-[8px] border-border" side="bottom" align="end">
                                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[15px] group-hover:!text-white leading-[28px]">Copy display name @{profile?.username?.split("@")[0]}</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                            <span className="text-[15px] group-hover:!text-white leading-[28px]">Show references</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                            <span className="text-[15px] group-hover:!text-white leading-[28px]">Account settings</span>
                                            <DropdownMenuShortcut className="text-[15px] group-hover:!text-white opacity-100">L</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                            <span className="text-[15px] group-hover:!text-white leading-[28px]">View your files</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                            <span className="text-[15px] group-hover:!text-white leading-[28px]">Copy Member ID</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                            <span className="text-[15px] group-hover:!text-white leading-[28px]">Copy link to profile</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="p-4 flex flex-col">
                    <div>
                        <div className="flex items-center">
                            <span className="text-[15px] font-black">Contact information</span>
                            {profile.id === user.id && (
                                <div className="ml-auto">
                                    <Button className="h-fit text-link text-[15px] font-bold p-0" variant={"link"}>
                                        Modifier
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex items-center pb-2">
                            <div className="p-2 flex items-center justify-center rounded-md bg-accent">
                                <Mail size={20} />
                            </div>

                            <div className="pl-2 flex flex-col overflow-hidden">
                                <div className="text-[13px]">E-mail address</div>
                                <a href={`mailto:${profile.email}`} className="cursor-pointer text-link text-[15px] hover:underline overflow-hidden text-ellipsis">
                                    <span>{profile.email}</span>
                                </a>
                            </div>
                        </div>

                        {profile.id === user.id && (
                            <Button className="text-link text-[15px] bg-transparent font-normal hover:bg-transparent rounded-none p-[8px_16px_8px_0]">
                                <Plus size={16} />
                                <span className="ml-2">Add phone</span>
                            </Button>
                        )}
                    </div>
                </div>
                {profile.id === user.id && (
                    <>
                        <Separator />
                        <div className="p-4">
                            <div className="flex flex-col">
                                <div>
                                    <div className="flex items-center">
                                        <span className="text-[15px] font-black">About me</span>
                                        {profile.id === user.id && (
                                            <div className="ml-auto">
                                                <Button className="h-fit text-link text-[15px] font-bold p-0" variant={"link"}>
                                                    Modifier
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {profile.id === user.id && (
                                        <Button className="text-link text-[15px] bg-transparent font-normal hover:bg-transparent rounded-none p-[8px_16px_8px_0]">
                                            <Plus size={16} />
                                            <span className="ml-2">Add Start Date</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </ScrollArea>
        </div>
    );
};

export default ChannelProfileUser;
