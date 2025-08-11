"use client";
import qs from "query-string";
import { useSocket } from "@/providers/socket-provider";
import { useQuery } from "@tanstack/react-query";

interface CanvasQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "workspaceId";
    paramValue: string;
}

export const useCanvasQuery = ({ queryKey, apiUrl, paramKey, paramValue }: CanvasQueryProps) => {
    const { isConnected } = useSocket();

    const fetchCanvas = async () => {
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
        queryKey: [queryKey],
        queryFn: fetchCanvas,
        refetchInterval: isConnected ? false : 1000,
    });

    return {
        canvas: data ?? [],
        status,
        error,
    };
};
