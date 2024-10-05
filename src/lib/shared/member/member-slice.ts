import { Member } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MemberProps {
    member: Member | null;
}

const initialState: MemberProps = {
    member: null,
};

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        setMember(state, action: PayloadAction<Member | null>) {
            state.member = action.payload;
        },
        clearMember(state) {
            state.member = null;
        },
    },
});

export const { setMember, clearMember } = memberSlice.actions;

export default memberSlice.reducer;
