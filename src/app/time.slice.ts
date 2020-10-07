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

// types cannot be inferred, so must be explicitly set
// https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
export const fetchAllTimezones = createAsyncThunk<
    string[],
    void,
    {
        extra: {
            worldTimeApiService: typeof WorldTimeApiService;
        };
    }
>("time/fetchAllTimezones", async (_, thunkAPI) => {
    const service = new thunkAPI.extra.worldTimeApiService();
    return await service.getAllTimezones();
});

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

export default timeState.reducer;
