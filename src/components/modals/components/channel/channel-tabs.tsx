"use client";
import { usePipelineQuery } from "@/hooks/use-pipeline-query";
import { usePipelineSocket } from "@/hooks/use-pipeline-socket";
import { Pipeline } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ChannelTabsItem from "./channel-tabs-item";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface IChannelTabs {
    channelId: string;
}

const ChannelTabs = ({ channelId }: IChannelTabs) => {
    const router = useRouter();
    const apiUrl = `/api/pipelines`;
    const paramKey = "channelId";
    const paramValue = channelId;

    const queryKey = `pipeline:${channelId}`;
    const addKey = `pipeline:${channelId}`;
    const updateKey = `pipeline:${channelId}:update`;

    const { pipelines, status } = usePipelineQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    usePipelineSocket({
        queryKey,
        addKey,
        updateKey,
    });

    const [pipelineList, setPipelineList] = useState<Pipeline[]>(pipelines);

    useEffect(() => {
        if (pipelines) {
            setPipelineList(pipelines);
        }
    }, [pipelines]);

    const onDragEnd = (results: DropResult) => {
        const { destination, source } = results;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Reorder the pipelines
        const newPipelines = Array.from(pipelineList);
        const [movedPipeline] = newPipelines.splice(source.index, 1);
        newPipelines.splice(destination.index, 0, movedPipeline);

        const reorderedPipelines = newPipelines.map((pipeline, index) => ({
            ...pipeline,
            order: index,
        }));

        setPipelineList(reorderedPipelines);
        handleUpdatePipelineOrder(reorderedPipelines);
    };

    const handleUpdatePipelineOrder = async (pipelines: Pipeline[]) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/socket/pipelines`,
                query: {
                    channelId,
                },
            });

            await axios.patch(url, {
                pipelines,
            });
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-accent p-[16px_28px]">
            <div className="p-[16px_20px] bg-background border rounded-[12px]">
                <span className="text-[15px] font-bold">Manage Tabs</span>
                <p className="mb-2 text-[15px]">Reorder, add, remove, and hide tabs that everyone sees in this channel.</p>

                <div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="w-full">
                                    {pipelineList.map((pipeline: Pipeline, index: number) => (
                                        <Draggable key={pipeline.id} draggableId={pipeline.id} index={index}>
                                            {(provided, snapshot) => {
                                                if (snapshot.isDragging) {
                                                    //@ts-ignore
                                                    const offset = { x: 155, y: 145 };
                                                    //@ts-ignore
                                                    const x = provided.draggableProps.style?.left - offset.x;
                                                    //@ts-ignore
                                                    const y = provided.draggableProps.style?.top - offset.y;
                                                    //@ts-ignore
                                                    provided.draggableProps.style = {
                                                        ...provided.draggableProps.style,
                                                        top: y,
                                                        left: x,
                                                    };
                                                }
                                                return (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <ChannelTabsItem pipeline={pipeline} isDragging={snapshot.isDragging} />
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                <div className="mt-2">
                    <Button className="h-9 p-[0_8px] text-[15px] border-foreground/40 gap-1 rounded-[8px]" variant={"outline"}>
                        <Plus size={18} />
                        New Tab
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChannelTabs;
