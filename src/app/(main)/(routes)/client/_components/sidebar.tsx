"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/shared/store";
import { cn } from "@/lib/utils";
import { EllipsisIcon, Plus } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { HomeFillIcon, HomeIcon, UserPlusIcon } from "@/components/icons";
import Hint from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";

const Sidebar = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const { workspace } = useSelector((state: RootState) => state.workspace);

    const workspaceStep = workspace?.step ?? 0;

    const opening = workspaceStep === 6;

    return (
        <div className="flex flex-col items-center h-[calc(100vh_-_40px)] pt-[8px]">
            <div className="w-[36px] h-[36px] mb-3">
                {workspace?.name && (
                    <div className=" w-full h-full bg-background-slack-secondary text-white rounded-[8px] flex items-center justify-center">
                        <span className="text-[20px] uppercase whitespace-nowrap font-bold">{workspace?.name?.substring(0, 1)}</span>
                    </div>
                )}
            </div>

            <div className={"flex flex-col items-center gap-[2px] p-[8px_0]"}>
                <div
                    className={cn("bg-[#532255] text-foreground-slack rounded-[8px] w-[36px] h-[36px] flex items-center justify-center", {
                        "bg-background-slack-secondary text-white": workspaceStep > 2,
                    })}
                >
                    {workspaceStep > 2 ? <HomeFillIcon size={20} /> : <HomeIcon size={20} />}
                </div>
                <span
                    className={cn("text-foreground-slack text-[11px] font-semibold", {
                        "text-white": workspaceStep > 2,
                    })}
                >
                    Welcome
                </span>
            </div>

            <div className="flex flex-[1] flex-col items-center gap-1 p-[8px_0]">
                <div
                    className={cn("w-[36px] h-[36px] text-foreground-slack flex items-center justify-center", {
                        "hover:bg-background-slack-secondary text-white rounded-[8px] cursor-pointer duration-300 transition-all": workspaceStep === 6,
                    })}
                >
                    <EllipsisIcon size={20} />
                </div>
                <span
                    className={cn("text-foreground-slack text-[11px] font-bold", {
                        "text-white": workspaceStep === 6,
                    })}
                >
                    Plus
                </span>
            </div>

            <div className="w-full pb-6 flex flex-col gap-4 items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={!opening} className="data-[state=closed]:outline-none">
                        <Hint side="right" sideOffset={10} disabled={!opening} content={"Create a new one"}>
                            <Button className="bg-background-slack-secondary hover:bg-foreground-slack rounded-full size-9 p-0">
                                <Plus size={16} />
                            </Button>
                        </Hint>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" sideOffset={6} className="w-[300px] p-0 rounded-[8px] border-none">
                        <DropdownMenuLabel className="h-[44px] p-[0_16px] text-[15px] font-extrabold flex items-center">Create</DropdownMenuLabel>
                        <Button variant={"ghost"} className="p-[0_16px] h-auto font-normal flex items-center w-full whitespace-nowrap text-ellipsis overflow-hidden">
                            <div className="p-[8px_0] flex items-center relative -top-[1px] flex-auto overflow-hidden text-ellipsis">
                                <div className="min-w-10 w-10 h-10 rounded-full mr-3 bg-[#f4daff] flex items-center justify-center">
                                    <FiEdit size={18} />
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex text-[15px] font-semibold leading-[22px]">
                                        <span>Message</span>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-ellipsis overflow-hidden text-[13px] leading-[18px]">Start a conversation in a direct message or channel</div>
                                    </div>
                                </div>
                            </div>
                        </Button>

                        <DropdownMenuSeparator className="my-1 bg-border" />

                        <Button variant={"ghost"} className="p-[0_16px] group h-auto font-normal flex items-center w-full whitespace-nowrap text-ellipsis overflow-hidden">
                            <div className="p-[8px_0] flex items-center relative -top-[1px] flex-auto overflow-hidden text-ellipsis">
                                <div className="min-w-10 w-10 h-10 rounded-full group-hover:bg-border transition-all duration-300 mr-3 flex items-center justify-center">
                                    <UserPlusIcon size={18} />
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex text-[15px] font-semibold leading-[22px]">
                                        <span>Invite people</span>
                                    </div>
                                </div>
                            </div>
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={!opening} className="data-[state=closed]:outline-none">
                        <Hint
                            side="right"
                            sideOffset={10}
                            disabled={!opening}
                            content={() => (
                                <span className="inline-flex items-center">
                                    {user?.username}
                                    <div className="relative w-[14px] h-[14px] ml-1">
                                        <span className="absolute w-[14px] h-[14px] bottom-0 right-0 before:absolute before:w-full before:h-full before:top-0 before:rounded-full before:bg-black before:z-0 z-10 after:absolute after:w-[9px] after:h-[9px] after:bg-[#2BAC76] after:rounded-full after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%] after:z-10"></span>
                                    </div>
                                </span>
                            )}
                        >
                            <div
                                className={cn("relative cursor-pointer w-[32px] h-[32px] opacity-30", {
                                    "opacity-100 w-[36px] h-[36px]": opening,
                                })}
                            >
                                <Image src={user?.imageUrl || `/assets/default_image.png`} fill alt="workspace_logo" className="object-cover rounded-[8px] overflow-hidden" />
                                {opening && <div className="absolute w-[14px] h-[14px] -bottom-[3px] -right-[3px] before:absolute before:w-full before:h-full before:top-0 before:rounded-full before:bg-background-slack before:z-0 z-10 after:absolute after:w-[9px] after:h-[9px] after:bg-[#2BAC76] after:rounded-full after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%] after:z-10"></div>}{" "}
                            </div>
                        </Hint>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="end" sideOffset={6} className="w-[300px] p-[12px_0] rounded-[8px] border-none">
                        <div className="p-[8px_20px_12px_24px] flex items-center">
                            <div className="w-[36px] h-[36px] rounded-[8px] overflow-hidden relative">
                                <Image src={user?.imageUrl || "/assets/default_image.png"} className="object-cover" fill alt={user?.username || "avatar"} />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <span className="inline-flex items-center font-bold">{user?.username}</span>
                                <div className="flex flex-row text-center">
                                    <div className="relative mt-[6px] w-[10px] h-[10px]">
                                        <span className="absolute w-[10px] h-[10px] top-0 right-0 z-10 after:absolute after:w-full after:h-full after:bg-[#2BAC76] after:rounded-full after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%] after:z-10"></span>
                                    </div>
                                    <span className="text-[13px] ml-1 text-muted-foreground">Available</span>
                                </div>
                            </div>
                        </div>
                        <DropdownMenuSeparator className="my-[8px] bg-border" />
                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                            <span className="text-base group-hover:!text-white leading-[28px]">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                            <span className="text-base group-hover:!text-white leading-[28px]">Preferences</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-[8px] bg-border" />
                        <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                            <span className="text-base group-hover:!text-white leading-[28px]">Sign out of {workspace?.name}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Sidebar;
