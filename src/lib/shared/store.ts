import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./workspaces/workspace-slice";
import userReducer from "./user/user-slice";
import conversationsSlice from "./conversations/conversations-slice";
import channelSlice from "./channels/channel-slice";
import memberSlice from "./member/member-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        workspace: workspaceReducer,
        channel: channelSlice,
        member: memberSlice,
        conversations: conversationsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
