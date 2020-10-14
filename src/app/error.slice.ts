import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

const setActiveError = createAction<string>("setActiveError");

type ErrorState = {
    activeError: string | null;
};

const initialState: ErrorState = {
    activeError: null,
};

const errorState = createSlice({
    name: "errors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setActiveError, (state, action) => {
            state.activeError = action.payload;
            // return (state.activeError = action.payload);
        });
    },
});

export default errorState.reducer;
