import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./workspaces/workspace-slice";
import userReducer from "./user/user-slice";
import conversationsReducer from "./conversations/conversations-slice";
import channelSlice from "./channels/channel-slice";
import memberSlice from "./member/member-slice";
import profileReducer from "./profile/profile-slice";
import channelNavigationReducer from "./channel-navigation/channel-navigation-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        workspace: workspaceReducer,
        channel: channelSlice,
        member: memberSlice,
        conversations: conversationsReducer,
        channelNavigation: channelNavigationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
