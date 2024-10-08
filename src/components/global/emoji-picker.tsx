import data from "@emoji-mart/data/sets/15/google.json";
import Picker from "@emoji-mart/react";
import { Popover } from "@radix-ui/react-popover";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useState, useRef, useEffect } from "react"; // Import React and necessary hooks

interface EmojiPickerProps {
    emojiComponent?: () => React.ReactElement;
    onChange: (value: string) => void;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    clickOnClose?: boolean; // Add clickOnClose to props
}

const EmojiPicker = React.forwardRef<HTMLButtonElement, EmojiPickerProps>(({ side = "top", sideOffset = -40, clickOnClose = true, onChange, emojiComponent }, ref) => {
    const { resolvedTheme } = useTheme();
    const [open, setOpen] = useState(false); // Local state to manage popover open state
    const popoverRef = useRef<HTMLButtonElement>(null); // Ref for the popover

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

    // Effect to close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (clickOnClose) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            if (clickOnClose) {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [clickOnClose]);

    return (
        <Popover open={open} onOpenChange={setOpen} ref={popoverRef}>
            <PopoverTrigger asChild>{DefaultEmojiComponent}</PopoverTrigger>
            <PopoverContent side={side} sideOffset={sideOffset} className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
                <Picker
                    theme={resolvedTheme}
                    set="google"
                    data={data}
                    onEmojiSelect={(emoji: any) => {
                        onChange(emoji);
                        if (clickOnClose) {
                            setOpen(false); // Close popover after emoji selection
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    );
});

EmojiPicker.displayName = "EmojiPicker";

export default EmojiPicker;
