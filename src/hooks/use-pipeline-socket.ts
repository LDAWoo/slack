"use client";
import { useSocket } from "@/providers/socket-provider";
import { Pipeline } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type PipelineSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

type PipelineProps = Pipeline;

export const usePipelineSocket = ({ addKey, updateKey, queryKey }: PipelineSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(updateKey, (updatedPipeline: PipelineProps | PipelineProps[]) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!updatedPipeline) return;
                return updatedPipeline;
            });
        });

        socket.on(addKey, (newPipeline: PipelineProps) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pipelines) {
                    return {
                        pipelines: [newPipeline],
                    };
                }

                return {
                    ...oldData,
                    pipelines: [...oldData.pipelines, newPipeline],
                };
            });
        });

        // Cleanup listeners
        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, socket, updateKey]);
};
