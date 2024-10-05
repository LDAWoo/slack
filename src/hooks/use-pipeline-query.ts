"use client";
import qs from "query-string";
import { useSocket } from "@/providers/socket-provider";
import { useQuery } from "@tanstack/react-query";

interface PipeLineQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId";
    paramValue: string;
}

export const usePipelineQuery = ({ queryKey, apiUrl, paramKey, paramValue }: PipeLineQueryProps) => {
    const { isConnected } = useSocket();

    const fetchPipeLine = async () => {
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    [paramKey]: paramValue,
                },
            },
            {
                skipNull: true,
            }
        );

        const res = await fetch(url);
        return res.json();
    };

    const { data, error, status } = useQuery({
        queryKey: [queryKey, paramValue],
        queryFn: fetchPipeLine,
        refetchInterval: isConnected ? false : 1000,
    });

    return {
        pipelines: data,
        status,
        error,
    };
};
