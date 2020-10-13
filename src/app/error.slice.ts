import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export default errorState.reducer;
