"use client";
import React, { memo } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { PiStackLight } from "react-icons/pi";
import { TiPinOutline } from "react-icons/ti";
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import Hint from "@/components/ui/hint";
import { cn } from "@/lib/utils";
import { Pipeline } from "@prisma/client";
import { CanvasIcon } from "@/components/icons";
import qs from "query-string";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const IconMapper = {
    Messages: <BiMessageRounded className="h-[18px] w-[18px]" />,
    Files: <PiStackLight className="h-[18px] w-[18px]" />,
    Pins: <TiPinOutline className="h-[18px] w-[18px]" />,
    Canvas: <CanvasIcon className="h-[18px] w-[18px]" />,
};

interface IChannelTabsItem {
    isDragging?: boolean;
    pipeline: Pipeline;
}

const ChannelTabsItem = ({ pipeline, isDragging }: IChannelTabsItem) => {
    const router = useRouter();
    const params = useParams();
    const { clientId, channelId } = params || {};
    const isHide = pipeline.status === "INACTIVE";

    const handleChangeStatus = async () => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/socket/pipelines/${pipeline.id}`,
                query: {
                    channelId,
                    workspaceId: clientId,
                },
            });

            await axios.patch(url, {
                status: pipeline.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={cn("w-full relative group h-[46px]", {
                "bg-background border border-border shadow-sm": isDragging,
            })}
            id={pipeline.id}
        >
            <div
                className={cn("flex items-center gap-1 p-2 h-full", {
                    "text-[#7c7a7f]": isHide,
                })}
            >
                {IconMapper[pipeline.name as keyof typeof IconMapper]}
                <span className="text-[15px]">{pipeline.name}</span>
            </div>

            <div className={cn("items-center absolute top-1/2 -translate-y-1/2 right-5 bg-background shadow-sm border border-border rounded-[6px] hidden group-hover:flex group-hover:opacity-100")}>
                <Hint content={isHide ? "Show tab" : "Hide tab"}>
                    <Button className="size-[30px] p-0 rounded-[4px] text-muted-foreground" variant="ghost" onClick={handleChangeStatus}>
                        <div className="w-full h-full flex items-center justify-center">{isHide ? <PiEyeClosed size={18} /> : <PiEye size={18} />}</div>
                    </Button>
                </Hint>
            </div>
        </div>
    );
};

export default memo(ChannelTabsItem);
