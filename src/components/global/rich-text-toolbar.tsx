import { cn } from "@/lib/utils";
import { memo } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BoldIcon, CheckIcon, Heading1, Heading2, Heading3, ItalicIcon, ParagraphIcon, UnderlineIcon } from "../icons";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Hint from "../ui/hint";
type RichTextToolBarProps = {
    open: boolean;
    format?: number;
    onFormat?: (format: number) => void;
    onBold?: () => void;
    onItalic?: () => void;
    onUnderline?: () => void;
    isBold?: boolean;
    isItalic?: boolean;
    isUnderline?: boolean;
};

const RichTextToolBar = ({ open, format = 0, onFormat = () => {}, onBold, onItalic, onUnderline, isBold, isItalic, isUnderline }: RichTextToolBarProps) => {
    const formatOptions = [
        {
            label: "Paragraph",
            icon: ParagraphIcon,
            value: 0,
        },
        {
            label: "Wide header",
            icon: Heading1,
            value: 1,
        },
        {
            label: "Medium header",
            icon: Heading2,
            value: 2,
        },
        {
            label: "Small header",
            icon: Heading3,
            value: 3,
        },
    ];

    return (
        <div
            className={cn("absolute bottom-[calc(100%_+_32px)] z-10 block duration-300 fade-in-0 zoom-in-95 slide-in-from-bottom-2  animate-in", {
                "hidden animate-out fade-out-0 zoom-out-95": !open,
            })}
        >
            <div className="bg-[#1a1d21] w-fit rounded-[8px] p-[2px] shadow-[0_0_0_1px_#e8e8e840,0_1px_3px_#00000014]">
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="p-0">
                            <Button className={cn(`h-7 p-[2px] pl-2 m-[2px] text-white bg-transparent hover:bg-[#ffffff13] rounded-[4px]`, {})}>
                                {formatOptions
                                    .filter((f) => f.value === format)
                                    .map((f, index) => (
                                        <span key={index} className="flex items-center">
                                            <f.icon size={15} />
                                        </span>
                                    ))}
                                <MdOutlineKeyboardArrowDown size={15} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start" alignOffset={-14} sideOffset={-4} className="w-[248px] p-[12px_0] rounded-[6px] shadow-sm bg-[#222529] border-none">
                            {formatOptions.map((f) => (
                                <DropdownMenuItem
                                    key={f.value}
                                    className={cn("p-[0_24px] cursor-pointer rounded-none w-full h-7 pl-1 group text-foreground-slack-secondary hover:!text-foreground-slack-secondary hover:!bg-background-slack-button-active", {
                                        "text-background-slack-button-active hover:!text-foreground-slack-secondary": format === f.value,
                                    })}
                                    onClick={() => onFormat(f.value)}
                                >
                                    <div className="flex items-center w-full">
                                        <div className="w-5 flex justify-center items-center">{format === f.value && <CheckIcon size={10} />}</div>
                                        <div className="mr-3 w-5 max-w-7">
                                            <f.icon size={18} />
                                        </div>
                                        <div className="flex-[auto] relative overflow-hidden text-ellipsis text-[15px] leading-[28px]">{f.label}</div>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <span className="h-5 w-[1px] m-[2px_4px] bg-[#ffffff40]" />
                    <Hint content={"Bold"} sideOffset={14}>
                        <Button
                            onMouseDown={onBold}
                            className={cn(`w-7 h-7 p-[2px] m-[2px] text-white bg-transparent hover:bg-[#ffffff13] rounded-[4px]`, {
                                "bg-[#e8e8e821] hover:bg-[#e8e8e833]": isBold,
                            })}
                        >
                            <BoldIcon size={15} />
                        </Button>
                    </Hint>

                    <Hint content={"Italic"} sideOffset={14}>
                        <Button
                            onMouseDown={onItalic}
                            className={cn(`w-7 h-7 p-[2px] m-[2px] text-white bg-transparent hover:bg-[#ffffff13] rounded-[4px]`, {
                                "bg-[#e8e8e821] hover:bg-[#e8e8e833]": isItalic,
                            })}
                        >
                            <ItalicIcon size={15} />
                        </Button>
                    </Hint>

                    <Hint content={"Underline"} sideOffset={14}>
                        <Button
                            onMouseDown={onUnderline}
                            className={cn(`w-7 h-7 p-[2px] m-[2px] text-white bg-transparent hover:bg-[#ffffff13] rounded-[4px]`, {
                                "bg-[#e8e8e821] hover:bg-[#e8e8e833]": isUnderline,
                            })}
                        >
                            <UnderlineIcon size={15} />
                        </Button>
                    </Hint>
                </div>
            </div>
        </div>
    );
};

export default memo(RichTextToolBar);
