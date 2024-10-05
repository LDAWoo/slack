"use client";
import EmojiPicker from "@/components/global/emoji-picker";
import { BookMarkIcon, EmojiPlus, MessageIcon, OptionIcon, ShareIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Hint from "@/components/ui/hint";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
interface MessageActionProps {
    canEditMessage: boolean;
    canDeletedMessage: boolean;
    isPin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onPin?: () => void;
    onReaction: (emoji: string) => void;
    onCopy?: () => void;
}

const MessageAction = ({ canDeletedMessage, canEditMessage, onEdit, onDelete, isPin, onPin, onReaction, onCopy }: MessageActionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("items-center absolute flex -top-3 right-5 bg-background shadow-sm border border-border rounded-[6px]", isOpen ? "!opacity-100 visible" : "invisible opacity-0 group-hover:visible group-hover:opacity-100")}>
            <Hint content={"Finished"}>
                <Button onClick={() => onReaction("https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/2705.png")} className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <div className="relative w-full h-full">
                        <Image src="https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/2705.png" alt="emoji_check" fill className="scale-50 object-cover" />
                    </div>
                </Button>
            </Hint>
            <Hint content={"I'll take a look..."}>
                <Button onClick={() => onReaction("https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/1f440.png")} className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <div className="relative w-full h-full">
                        <Image src="https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/1f440.png" alt="emoji_eyes" fill className="scale-50 object-cover" />
                    </div>
                </Button>
            </Hint>
            <Hint content={"Dravo !"}>
                <Button onClick={() => onReaction("https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/1f64c.png")} className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <div className="relative w-full h-full">
                        <Image src="https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/1f64c.png" alt="emoji_eyes" fill className="scale-50 object-cover" />
                    </div>
                </Button>
            </Hint>

            <Hint content="Find another reaction">
                <Button className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <EmojiPicker
                        emojiComponent={() => (
                            <Button className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                                <EmojiPlus size={18} />
                            </Button>
                        )}
                        side="left"
                        sideOffset={0}
                        onChange={(emoji: any) => {
                            const url = `https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/${emoji.unified}.png`;
                            onReaction(url);
                        }}
                    />
                </Button>
            </Hint>
            <Hint content={"Reply in the thread"}>
                <Button className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <MessageIcon size={18} />
                </Button>
            </Hint>
            <Hint content={"Forward the message..."}>
                <Button className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <ShareIcon size={18} />
                </Button>
            </Hint>
            <Hint content={"Save for later"}>
                <Button className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                    <BookMarkIcon size={18} />
                </Button>
            </Hint>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <Hint content={"Other action"} disabled={isOpen} align="end" arrowAlign="end">
                    <DropdownMenuTrigger asChild className="p-0">
                        <Button className="size-8 p-0 rounded-[4px] text-muted-foreground" variant={"ghost"}>
                            <OptionIcon size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                </Hint>
                <DropdownMenuContent className="w-[300px] p-[12px_0] rounded-[8px] border-border" side="left" align="start" alignOffset={-10} sideOffset={10}>
                    <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                        <span className="text-[15px] group-hover:!text-white leading-[28px]">Dis. nofi. for replies</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                    <DropdownMenuItem onClick={onCopy} className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                        <span className="text-[15px] group-hover:!text-white leading-[28px]">Copy link</span>
                        <DropdownMenuShortcut className="text-[15px] group-hover:!text-white opacity-100">L</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                    <DropdownMenuItem onClick={onPin} className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                        <span className="text-[15px] group-hover:!text-white leading-[28px]">{isPin ? "Unpin from channel" : "Pin to channel"}</span>
                        <DropdownMenuShortcut className="text-[15px] group-hover:!text-white opacity-100">P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                    <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                        <span className="text-[15px] group-hover:!text-white leading-[28px]">Start a team call in this thread...</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                    {canEditMessage && (
                        <>
                            <DropdownMenuItem onClick={onEdit} className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                                <span className="text-[15px] group-hover:!text-white leading-[28px]">Edit message</span>
                                <DropdownMenuShortcut className="text-[15px] group-hover:!text-white opacity-100">E</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </>
                    )}
                    {canDeletedMessage && (
                        <>
                            <DropdownMenuItem onClick={onDelete} className="p-[0_24px] w-full h-[28px] group hover:!bg-rose-600 items-center text-center rounded-none cursor-pointer m-0">
                                <span className="text-[15px] group-hover:!text-white leading-[28px] text-rose-600">Delete message</span>
                                <DropdownMenuShortcut className="text-[15px] group-hover:!text-white opacity-100 uppercase">Delete</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-[8px] bg-foreground/15" />
                        </>
                    )}
                    <DropdownMenuItem className="p-[0_24px] w-full h-[28px] group hover:!bg-background-slack-button-active items-center text-center rounded-none cursor-pointer m-0">
                        <span className="text-[15px] group-hover:!text-white leading-[28px]">Add a message shortcut...</span>
                        <DropdownMenuShortcut className="text-[15px] group-hover:!text-white opacity-100">A</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default MessageAction;
