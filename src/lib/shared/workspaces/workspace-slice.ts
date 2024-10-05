import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel, Member, Workspace } from "@prisma/client";
import { WorkspaceWithChannelAndMember } from "@/lib/types";

const initialState: WorkspaceWithChannelAndMember = {
    workspace: null,
};

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        // Đặt workspace mới vào state, bao gồm members và channels
        setWorkspace: (state, action: PayloadAction<Workspace & { members: Member[]; channels: Channel[] }>) => {
            state.workspace = action.payload;
        },
        updateWorkspace: (state, action: PayloadAction<Partial<Workspace & { members: Member[]; channels: Channel[] }>>) => {
            if (state.workspace) {
                state.workspace = { ...state.workspace, ...action.payload };
            }
        },
        // Xóa workspace
        clearWorkspace: (state) => {
            state.workspace = null;
        },
    },
});

export const { setWorkspace, updateWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
