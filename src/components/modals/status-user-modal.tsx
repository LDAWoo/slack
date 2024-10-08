"use client";
import { useModal } from "@/providers/modal-provider";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import EmojiPicker from "../global/emoji-picker";
import { Button } from "../ui/button";
import { Check, ChevronDown, Smile } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import qs from "query-string";
import axios from "axios";
import { useParams } from "next/navigation";

const STATUS_OPTIONS = [
    { label: "30 minutes", value: "30" },
    { label: "1 hour", value: "1" },
    { label: "4 hours", value: "4" },
    { label: "Today", value: "today" },
    { label: "This week", value: "weekend" },
];

const StatusUserModal = () => {
    const params = useParams();
    const { clientId } = params || {};
    const { isOpen, type, data, onClose } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [statusText, setStatusText] = useState("");
    const [currentTime, setCurrentTime] = useState("30");
    const isModalOpen = isOpen && data && type === "statusUser";

    const { member } = data;

    if (!isModalOpen || !clientId) return;

    const handleEmojiSelected = (emoji: any) => {
        const url = `https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/${emoji.unified}.png`;
        setEmoji(url);
    };

    const handleSave = async () => {
        const expirationDate = new Date();

        switch (currentTime) {
            case "30":
                expirationDate.setMinutes(expirationDate.getMinutes() + 30);
                break;
            case "1":
                expirationDate.setHours(expirationDate.getHours() + 1);
                break;
            case "4":
                expirationDate.setHours(expirationDate.getHours() + 4);
                break;
            case "today":
                expirationDate.setHours(23, 59, 59, 999);
                break;
            case "weekend":
                const daysUntilSaturday = (6 - expirationDate.getDay() + 7) % 7;
                expirationDate.setDate(expirationDate.getDate() + daysUntilSaturday);
                expirationDate.setHours(23, 59, 59, 999);
                break;
            default:
                break;
        }

        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/socket/members/${member?.id}`,
                query: {
                    workspaceId: clientId,
                    statusText,
                    statusEmoji: emoji,
                    statusExpiration: expirationDate.toISOString(),
                },
            });

            await axios.post(url);
            setIsLoading(false);
            onClose();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="w-[520px] bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[6px]">
                <DialogHeader className="p-[16px_24px] pb-0">
                    <DialogTitle className="text-2xl text-left font-extrabold mr-[32px]">{`Set a status`}</DialogTitle>
                </DialogHeader>

                <div className="m-[12px_20px_8px_20px]">
                    <div className="flex items-center relative focus-within:!shadow-focus-border h-[42px] rounded-[4px] focus-within:!rounded-[6px] overflow-hidden w-full focus-within:!border-transparent border border-foreground/50">
                        <div className="w-[42px] h-full flex items-center justify-center">
                            <EmojiPicker
                                onChange={handleEmojiSelected}
                                side="bottom"
                                emojiComponent={() => (
                                    <div>
                                        {emoji && (
                                            <div className="w-[32px] h-[32px] overflow-hidden relative cursor-pointer">
                                                <Image src={emoji} alt="Status" fill className="w-full h-full object-cover" />
                                            </div>
                                        )}

                                        {!emoji && (
                                            <Button className="p-0 text-muted-foreground w-full h-full hover:bg-transparent bg-transparent rounded-none" variant={"ghost"}>
                                                <Smile size={24} />
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                        <input type="text" onChange={(v) => setStatusText(v.target.value)} autoComplete="off" className="focus:outline-none focus:border-none w-full h-full border-none p-[9px_0] text-[18px] leading-[22px] placeholder:text-[#8D8D8D]" placeholder="What is your status?" />
                    </div>

                    <div className="mt-3">
                        <div className="mb-2">
                            <span className="text-[15px] font-bold">Remove status after...</span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="data-[state=open]:shadow-focus-border data-[state=open]:border-transparent w-full h-[42px] flex items-center rounded-lg justify-between p-[0_12px] hover:bg-transparent border-foreground/50 border overflow-visible font-normal text-[18px]">
                                <span>{STATUS_OPTIONS.find((option) => option.value === currentTime)?.label || "Select duration"}</span>
                                <ChevronDown size={12} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[486px] p-[12px_0] rounded-[8px] border-border bg-accent" side="bottom" align="end" sideOffset={-2} alignOffset={-6}>
                                {STATUS_OPTIONS.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        className="relative p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center rounded-none cursor-pointer m-0"
                                        onClick={() => setCurrentTime(option.value)} // Update state on click
                                    >
                                        <div
                                            className={cn("flex items-center gap-[8px] text-foreground group-hover:!text-white", {
                                                "text-background-slack-button-active group-hover:!text-white": currentTime === option.value,
                                            })}
                                        >
                                            {currentTime === option.value && (
                                                <span className="absolute left-1 top-[50%] -translate-y-1/2">
                                                    <Check size={16} />
                                                </span>
                                            )}
                                            <span className="text-[15px] leading-[28px]">{option.label}</span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <DialogFooter className="p-[24px_28px]">
                    <div className="ml-auto">
                        <Button variant={"outline"} disabled={isLoading} onClick={handleClose} className="min-w-[80px] text-[15px] h-[36px] rounded-[8px] p-[0_12px] transition-all duration-300">
                            Cancel
                        </Button>

                        <Button onClick={handleSave} disabled={isLoading} className={cn("ml-2 min-w-[80px] text-[15px] h-[36px] rounded-[8px] p-[0_12px] transition-all duration-300 bg-[#007a5a] hover:bg-[#148567]", {})}>
                            Save
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StatusUserModal;
