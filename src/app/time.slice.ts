import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";

type TimeState = {
    isLoading: boolean;
    timezones: string[];
    area: string | null;
    location: string | null;
    region: string | null;
};

const initialState: TimeState = {
    isLoading: true,
    timezones: [],
    area: null,
    location: null,
    region: null,
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
    
    //testing this
    const x = service.getCurrentTime("Africa", "Abidjan");
    
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
            state.isLoading = false;
        });
    },
});

export default timeState.reducer;
