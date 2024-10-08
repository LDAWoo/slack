"use client";
import { setChannelNavigation } from "@/lib/shared/channel-navigation/channel-navigation-slice";
import { cn } from "@/lib/utils";
import { Pipeline } from "@prisma/client";
import React, { memo } from "react";
import { BiMessageRounded, BiSolidMessageRounded } from "react-icons/bi";
import { PiStackFill, PiStackLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { TiPin, TiPinOutline } from "react-icons/ti";

const IconMapper = {
    Messages: <BiMessageRounded id="icon-outline" className="h-[18px] w-[18px]" />,
    Files: <PiStackLight id="icon-outline" className="h-[18px] w-[18px]" />,
    Pins: <TiPinOutline id="icon-outline" className="h-[18px] w-[18px]" />,
};

const IconFillMapper = {
    Messages: <BiSolidMessageRounded id="icon-fill" className="h-[18px] w-[18px]" />,
    Files: <PiStackFill id="icon-fill" className="h-[18px] w-[18px]" />,
    Pins: <TiPin id="icon-fill" className="h-[18px] w-[18px]" />,
};

interface ChannelTabItemProps {
    isActive: boolean;
    pipeline: Pipeline;
    isDragging: boolean;
}

const ChannelTabItem: React.FC<ChannelTabItemProps> = ({ isActive, pipeline, isDragging }) => {
    const dispatch = useDispatch();
    const iconKey = pipeline.name as keyof typeof IconMapper;
    const iconFillKey = pipeline.name as keyof typeof IconFillMapper;

    const handleClick = () => {
        dispatch(
            setChannelNavigation({
                tab: pipeline.name,
            })
        );
    };

    return (
        <div
            onClick={handleClick}
            id={pipeline.id}
            className={cn("cursor-pointer flex items-center font-bold w-fit !text-foreground relative gap-1 p-[8px] h-[38px] shadow-none rounded-none rounded-tl-[6px] rounded-tr-[6px] hover:bg-accent", {
                "border border-foreground/20 rounded-[6px] bg-background shadow-sm": isDragging,
            })}
        >
            {isActive ? IconFillMapper[iconKey] : IconMapper[iconFillKey]}
            <span className="text-[13px]">{pipeline.name}</span>
            {isActive && (
                <span
                    className={cn("absolute -bottom-[1px] left-0 bg-background-slack w-full h-[2px]", {
                        hidden: isDragging,
                    })}
                    id="line"
                />
            )}
        </div>
    );
};

export default memo(ChannelTabItem);
