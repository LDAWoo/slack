import data from "@emoji-mart/data/sets/15/google.json";
import Picker from "@emoji-mart/react";
import { Popover } from "@radix-ui/react-popover";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react"; // Import React

interface EmojiPickerProps {
    emojiComponent?: () => React.ReactElement;
    onChange: (value: string) => void;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
}

const EmojiPicker = React.forwardRef<HTMLButtonElement, EmojiPickerProps>(({ side = "top", sideOffset = -40, onChange, emojiComponent }, ref) => {
    const { resolvedTheme } = useTheme();

    const DefaultEmojiComponent = emojiComponent ? (
        emojiComponent()
    ) : (
        <Button
            ref={ref} // Forward ref to Button if needed
            className="p-0 text-muted-foreground h-[28px] w-[28px] rounded-[4px]"
            variant={"ghost"}
        >
            <Smile size={18} />
        </Button>
    );

    return (
        <Popover>
            <PopoverTrigger asChild>{DefaultEmojiComponent}</PopoverTrigger>
            <PopoverContent side={side} sideOffset={sideOffset} className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
                <Picker theme={resolvedTheme} set="google" data={data} onEmojiSelect={(emoji: any) => onChange(emoji)} />
            </PopoverContent>
        </Popover>
    );
});

EmojiPicker.displayName = "EmojiPicker";

export default EmojiPicker;
