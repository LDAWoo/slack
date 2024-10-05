import { Conversation } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConversationsProps {
    conversations: Conversation[] | null;
}

const initialState: ConversationsProps = {
    conversations: null,
};

const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<Conversation[] | null>) => {
            state.conversations = action.payload;
        },
        updateConversations: (state, action: PayloadAction<Conversation | null>) => {
            if (action.payload) {
                if (state.conversations) {
                    state.conversations = [...state.conversations, action.payload];
                } else {
                    state.conversations = [action.payload];
                }
            }
        },
        clearConversations: (state) => {
            state.conversations = null;
        },
    },
});

export const { setConversations, updateConversations, clearConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
