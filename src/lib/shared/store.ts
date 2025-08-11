import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { api } from "./common/store";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import profileReducer from "./profile/profile-slice";
import channelNavigationReducer from "./channel-navigation/channel-navigation-slice";

export const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            profile: profileReducer,
            channelNavigation: channelNavigationReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
        ...options,
    });

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
