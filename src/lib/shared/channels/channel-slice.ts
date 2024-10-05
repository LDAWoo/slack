import { Channel, Pipeline } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChannelProps {
    channel: Channel & {
        pipelines: Pipeline[];
    };
}

const initialState: ChannelProps = {
    channel: null,
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannel(state, action: PayloadAction<Channel | null>) {
            state.channel = action.payload;
        },
        clearChannel(state) {
            state.channel = null;
        },
        updateChannel(state, action: PayloadAction<Partial<Channel>>) {
            if (state.channel) {
                state.channel = { ...state.channel, ...action.payload };
            }
        },
    },
});

export const { setChannel, clearChannel, updateChannel } = channelSlice.actions;

export default channelSlice.reducer;
