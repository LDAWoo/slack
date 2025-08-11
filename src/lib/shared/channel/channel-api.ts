import { Channel } from "@prisma/client";
import { api } from "../common/store";
import { ChannelDetailsResponseModels } from "../rest-response-models";

type ChannelUpdateInputWithWorkspaceIdAndChannelId = {
    workspaceId: string;
    channelId: string;
};

export const channelsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChannels: builder.query<Channel[], void>({
            query: () => "channels",
        }),
        getChannel: builder.query<ChannelDetailsResponseModels, ChannelUpdateInputWithWorkspaceIdAndChannelId>({
            query: (query) => `channels/${query.channelId}?workspaceId=${query.workspaceId}`,
            transformResponse: (response: Channel) => {
                return { channel: response } as ChannelDetailsResponseModels;
            },
        }),
    }),
});

export const { useGetChannelsQuery, useGetChannelQuery } = channelsApi;

export const {
    endpoints: { getChannels, getChannel },
} = channelsApi;
