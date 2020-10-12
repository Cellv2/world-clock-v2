import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";
import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";

type TimeState = {
    isLoading: boolean;
    timezones: string[];
    area: string | null;
    location: string | null;
    region: string | null;
    currentTimeResponse: WorldTimeApiResponseSchema | null;
};

const initialState: TimeState = {
    isLoading: true,
    timezones: [],
    area: null,
    location: null,
    region: null,
    currentTimeResponse: null,
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

export const getCurrentTimeInTimezone = createAsyncThunk<
    WorldTimeApiResponseSchema,
    void,
    {
        extra: {
            worldTimeApiService: typeof WorldTimeApiService;
        };
    }
>("time/getCurrentTimeInTimezone", async (_, thunkAPI) => {
    const service = new thunkAPI.extra.worldTimeApiService();
    // return await service.getCurrentTime("Africa", "Abidjan");
    return await service.getCurrentTime();
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
            state.isLoading = false;
        });
        // TODO: add rejection cases
        builder.addCase(
            getCurrentTimeInTimezone.fulfilled,
            (state, { payload }) => {
                state.currentTimeResponse = payload;
            }
        );
        // TODO: add rejection cases
    },
});

export default timeState.reducer;
