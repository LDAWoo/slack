import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IData {
    messageId?: string;
}

type ChannelNavigationState = {
    tab: string | null;
    data: IData | null;
};

const initialState: ChannelNavigationState = {
    tab: "Messages",
    data: {},
};

const channelNavigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setChannelNavigation: (state, action: PayloadAction<{ tab: string; data?: IData }>) => {
            state.tab = action.payload.tab;
            if (action.payload.data) {
                state.data = action.payload.data;
            }
        },
        clearChannelNavigation: (state) => {
            state.tab = null;
            state.data = null;
        },
    },
});

export const { setChannelNavigation, clearChannelNavigation } = channelNavigationSlice.actions;
export default channelNavigationSlice.reducer;
