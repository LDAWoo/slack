import { MemberWithUser } from "@/lib/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type MemberState = {
    member: MemberWithUser | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

const initialState: MemberState = {
    member: null,
    status: "idle",
    error: null,
};

export const doGetMember = createAsyncThunk<MemberWithUser, { memberId: string }>("member/getMember", async ({ memberId }) => {
    try {
        const response = await axios.get(`/api/members/${memberId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        setMember(state, action: PayloadAction<MemberWithUser | null>) {
            state.member = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(doGetMember.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(doGetMember.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.member = action.payload;
        });
        builder.addCase(doGetMember.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to fetch canvas"; // Set the error message
        });
    },
});

export const { reducer: memberReducer } = memberSlice;
export const { setMember } = memberSlice.actions;
export default memberSlice.reducer;
