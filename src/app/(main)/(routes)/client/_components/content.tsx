"use client";

import { PrefixIcon } from "@/components/icons";
import { RootState } from "@/lib/shared/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Channel from "./channel";

const Content = () => {
    const { workspace } = useSelector((state: RootState) => state.workspace);

    const { conversations } = useSelector((state: RootState) => state.conversations);

    const channel = workspace?.channels[2];

    const workspaceStep = workspace?.step ?? 0;

    const opening = workspaceStep === 6;

    return (
        <div className="w-full h-[calc(100vh_-_40px)] bg-[#5B2B5D] rounded-tl-[5px] rounded-bl-[5px] select-none">
            <div className="flex flex-col h-full w-full relative">
                <div className="flex items-center h-[49px] p-[0_16px]">
                    <div>{workspace?.name && <span className="text-white text-lg font-extrabold">{workspace.name}</span>}</div>
                </div>

                <div className="flex-[1] relative">
                    <div className="w-0 h-0 overflow-visible"></div>
                    <div className="w-full h-[638px] overflow-hidden">
                        <div className="w-full h-full overflow-y-auto no-scrollbar">
                            {!opening ? (
                                <div className="w-[266px] h-[96px] relative">
                                    <div
                                        className={cn("absolute top-0 w-full h-7 flex items-center -translate-y-full transition-all duration-300", {
                                            "translate-y-0": workspace?.step ? workspace.step > 2 : false,
                                        })}
                                    >
                                        <span
                                            className={cn("w-full p-[0_20px] text-[13px] font-semibold text-foreground-slack-secondary", {
                                                "text-white": channel && channel?.name,
                                            })}
                                        >
                                            Channels
                                        </span>
                                    </div>
                                    <div
                                        className={cn("absolute top-[28px] h-7 flex items-center w-full -translate-y-full transition-all duration-300", {
                                            "translate-y-0": workspace?.step ? workspace.step > 2 : false,
                                        })}
                                    >
                                        {channel && channel?.name && (
                                            <span className="inline-flex items-center h-full w-full p-[0_20px] text-[15px] leading-[22px] text-white">
                                                <span className="w-5 h-5 mr-1 flex items-center justify-center">
                                                    <PrefixIcon size={16} />
                                                </span>
                                                <span className="overflow-hidden w-full text-ellipsis whitespace-nowrap">{channel.name}</span>
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className={cn("absolute bottom-0 w-full -translate-y-full transition-all duration-300", {
                                            "translate-y-0": workspace?.step ? workspace.step > 2 : false,
                                        })}
                                    >
                                        {channel && channel?.name && (
                                            <span
                                                className={cn("w-full p-[0_20px] text-[13px] font-semibold text-foreground-slack-secondary", {
                                                    "text-white": conversations ?? true,
                                                })}
                                            >
                                                Messages directs
                                            </span>
                                        )}
                                    </div>
                                    {conversations &&
                                        conversations.map((conversation, index) => (
                                            <div
                                                key={conversation.memberTwoEmail}
                                                className="absolute w-full"
                                                style={{
                                                    top: `${75 + (index + 1) * 30}px`,
                                                }}
                                            >
                                                <div className="flex items-center w-full p-[0_20px] text-[15px] text-white">
                                                    <div className="h-5 w-5 relative rounded-[5px] overflow-hidden mr-2">
                                                        <Image src={"/assets/default_image.png"} alt={conversation.memberTwoEmail} fill className="object-cover" />
                                                    </div>
                                                    <span>{conversation.memberTwoEmail.split("@")[0]}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="w-full">
                                    <Channel />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
