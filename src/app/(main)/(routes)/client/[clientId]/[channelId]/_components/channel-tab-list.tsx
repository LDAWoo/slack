"use client";
import { usePipelineQuery } from "@/hooks/use-pipeline-query";
import { usePipelineSocket } from "@/hooks/use-pipeline-socket";
import { Pipeline } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import ChannelTabItem from "./channel-tab-item";

interface IChannelTabList {
    channelId?: string; // Optional to accommodate default value
    tab?: string; // Optional to accommodate default value
    onTabClick?: (tab: string) => void; // Optional to accommodate default value
}

// ChannelTabList component
const ChannelTabList = ({ channelId = "", tab = "", onTabClick = () => {} }: IChannelTabList) => {
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

    const [pipelineList, setPipelineList] = useState<Pipeline[]>(pipelines || []);

    useEffect(() => {
        if (pipelines) {
            setPipelineList(pipelines);
        }
    }, [pipelines]);

    if (status === "pending") {
        return <div>Pending fetching pipelines</div>;
    }

    if (status === "error") {
        return <div>Error fetching pipelines</div>;
    }

    const onDragEnd = (results: DropResult) => {
        const { destination, source } = results;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Reorder the pipelines
        const newPipelines = Array.from(pipelineList);
        const [movedPipeline] = newPipelines.splice(source.index, 1);
        newPipelines.splice(destination.index, 0, movedPipeline);

        // Update the order field in the pipelines
        const reorderedPipelines = newPipelines.map((pipeline, index) => ({
            ...pipeline,
            order: index,
        }));

        // Update local state
        setPipelineList(reorderedPipelines);

        // Update server with new order
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
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex w-full gap-1">
                        {pipelineList.map((pipeline: Pipeline, index: number) => (
                            <Draggable key={pipeline.id} draggableId={pipeline.id} index={index}>
                                {(provided, snapshot) => (
                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="!ml-0">
                                        <ChannelTabItem pipeline={pipeline} isActive={pipeline.name === tab} onClick={onTabClick} isDragging={snapshot.isDragging} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChannelTabList;
