import { Canvas } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type CanvasState = {
    canvas: Canvas | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

const initialCanvas: CanvasState = {
    canvas: null,
    status: "idle",
    error: null,
};

export const doGetCanvas = createAsyncThunk<Canvas, { canvasId: string }>("canvas/getCanvas", async ({ canvasId }) => {
    try {
        const response = await axios.get(`/api/canvas/${canvasId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const canvasSlice = createSlice({
    name: "canvas",
    initialState: initialCanvas,
    reducers: {
        // You can add synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(doGetCanvas.pending, (state) => {
                state.status = "loading"; // Set status to loading when the thunk is pending
            })
            .addCase(doGetCanvas.fulfilled, (state, action) => {
                state.status = "succeeded"; // Set status to succeeded when the thunk is fulfilled
                state.canvas = action.payload; // Set the fetched canvas
                state.error = null; // Clear any previous errors
            })
            .addCase(doGetCanvas.rejected, (state, action) => {
                state.status = "failed"; // Set status to failed when the thunk is rejected
                state.error = action.error.message || "Failed to fetch canvas"; // Set the error message
            });
    },
});

// Export the reducer to be used in the store
export const { reducer: canvasReducer } = canvasSlice;

// You can also export any actions if defined in reducers
export const {} = canvasSlice.actions;
