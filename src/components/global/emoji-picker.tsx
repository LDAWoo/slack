"use client";
import data from "@emoji-mart/data/sets/15/google.json";
import Picker from "@emoji-mart/react";
import { Popover } from "@radix-ui/react-popover";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useState } from "react";

type Emoji = {
    unified: string;
};

interface EmojiPickerProps {
    emojiComponent?: () => React.ReactElement;
    onChange: (emoji: Emoji) => void;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    clickOnClose?: boolean;
}

const EmojiPicker = React.forwardRef<HTMLButtonElement, EmojiPickerProps>(({ side = "top", sideOffset = -40, clickOnClose = true, onChange, emojiComponent }, ref) => {
    const { resolvedTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const DefaultEmojiComponent = emojiComponent ? (
        emojiComponent()
    ) : (
        <Button
            ref={ref} // Forward ref to Button if needed
            className="p-0 text-muted-foreground h-[28px] w-[28px] rounded-[4px]"
            variant={"ghost"}
            onClick={() => setOpen((prev) => !prev)} // Toggle popover on button click
        >
            <Smile size={18} />
        </Button>
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{DefaultEmojiComponent}</PopoverTrigger>
            <PopoverContent side={side} sideOffset={sideOffset} className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
                <Picker
                    theme={resolvedTheme}
                    set="google"
                    data={data}
                    onEmojiSelect={(emoji: Emoji) => {
                        onChange(emoji);
                        if (clickOnClose) {
                            setOpen(false);
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    );
});

EmojiPicker.displayName = "EmojiPicker";

export default EmojiPicker;
