import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileProps {
    profile: User | null;
}

const initialState: ProfileProps = {
    profile: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<User | null>) {
            state.profile = action.payload;
        },
        clearProfile(state) {
            state.profile = null;
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
