"use client";
import { useSocket } from "@/providers/socket-provider";
import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useMemberQuery = () => {
    const params = useParams();
    const { isConnected } = useSocket();
    const { clientId } = params || {};

    const apiUrl = "/api/members";
    const queryKey = `member:${clientId}`;
    const paramKey = "workspaceId";
    const paramValue = clientId;

    const fetchMembers = async () => {
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
        queryFn: fetchMembers,
        refetchInterval: isConnected ? false : 1000,
    });

    return {
        members: data,
        status,
        error,
    };
};
