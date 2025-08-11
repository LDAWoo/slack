"use client";
import { setChannelNavigation } from "@/lib/shared/channel-navigation/channel-navigation-slice";
import { cn } from "@/lib/utils";
import { Pipeline } from "@prisma/client";
import React, { memo } from "react";
import { BiMessageRounded, BiSolidMessageRounded } from "react-icons/bi";
import { PiStackFill, PiStackLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import qs from "query-string";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { CanvasIcon } from "@/components/icons";

const IconMapper = {
    Messages: <BiMessageRounded id="icon-outline" className="h-[18px] w-[18px]" />,
    Files: <PiStackLight id="icon-outline" className="h-[18px] w-[18px]" />,
    Pins: <TiPinOutline id="icon-outline" className="h-[18px] w-[18px]" />,
    Canvas: <CanvasIcon className="h-[18px] w-[18px]" />,
};

const IconFillMapper = {
    Messages: <BiSolidMessageRounded id="icon-fill" className="h-[18px] w-[18px]" />,
    Files: <PiStackFill id="icon-fill" className="h-[18px] w-[18px]" />,
    Pins: <TiPin id="icon-fill" className="h-[18px] w-[18px]" />,
    Canvas: <CanvasIcon className="h-[18px] w-[18px]" />,
};

interface ChannelTabItemProps {
    isActive: boolean;
    pipeline: Pipeline;
    isDragging: boolean;
}

const ChannelTabItem: React.FC<ChannelTabItemProps> = ({ isActive, pipeline, isDragging }) => {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { clientId, channelId } = params || {};
    const iconKey = pipeline.name as keyof typeof IconMapper;
    const iconFillKey = pipeline.name as keyof typeof IconFillMapper;

    const handleClick = () => {
        dispatch(
            setChannelNavigation({
                tab: pipeline.name,
            })
        );
    };

    if (pipeline.status === "INACTIVE") return null;

    const onHide = async () => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/socket/pipelines/${pipeline.id}`,
                query: {
                    workspaceId: clientId,
                    channelId,
                },
            });

            await axios.patch(url, { status: "INACTIVE" });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContextMenu modal={false}>
            <ContextMenuTrigger asChild>
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
            </ContextMenuTrigger>
            <ContextMenuContent className="w-[200px] p-[12px_0] rounded-[8px] border-border">
                <ContextMenuItem onClick={onHide} className="p-[0_24px] w-full h-[28px] group hover:!bg-rose-600 items-center text-center rounded-none cursor-pointer m-0">
                    <span className="text-[15px] group-hover:!text-white leading-[28px] text-rose-600">Hide tab</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default memo(ChannelTabItem);
