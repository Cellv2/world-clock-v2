import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";

type TimeState = {
    isLoading: boolean;
    timezones: string[];
};

const initialState: TimeState = {
    isLoading: false,
    timezones: [],
};

export const fetchAllTimezones = createAsyncThunk(
    "time/fetchAllTimezones",
    async () => {
        // TODO: find a way to DI this
        const svc = new WorldTimeApiService();
        const response = await svc.getAllTimezones();
        console.log("FETCH TIMEZONES", response);
        return response;
    }
);

export const timeState = createSlice({
    name: "time",
    initialState,
    reducers: {
        setTimezones: (state, action: PayloadAction<string[]>) => {
            state.timezones = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTimezones.fulfilled, (state, { payload }) => {
            state.timezones = payload;
        });
    },
});

export const getTimezonesAsync = (): AppThunk => (dispatch) => {
    dispatch(fetchAllTimezones());
};

export default timeState.reducer;
