import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";
import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";
import { RootState } from "./store";
import { generateTimezoneObject } from "../utils";

type TimeState = {
    isLoading: boolean;
    timezones: Areas;
    selectedArea: string | null;
    selectedLocation: string | null;
    selectedRegion: string | null;
    currentTimeResponse: WorldTimeApiResponseSchema | null;
    testTimezoneData: object;
};

const initialState: TimeState = {
    isLoading: true,
    timezones: {},
    selectedArea: null,
    selectedLocation: null,
    selectedRegion: null,
    currentTimeResponse: null,
    testTimezoneData: {
        America: {
            Adak: "America/Adak",
            Anchorage: "America/Anchorage",
            Argentina: {
                Catamarca: "America/Argentina/Catamarca",
            },
        },
        CET: "CET",
    },
};

// types cannot be inferred, so must be explicitly set
// https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
/**
 * Get all timezones from external API
 *
 * * Rejected case lives in notification slice
 */
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
    return await service.getCurrentTime();
});

export const timeState = createSlice({
    name: "time",
    initialState,
    reducers: {
        setSelectedArea: (state, action: PayloadAction<string>) => {
            state.selectedArea = action.payload;
            state.selectedLocation = null;
            state.selectedRegion = null;
        },
        setSelectedLocation: (state, action: PayloadAction<string>) => {
            state.selectedLocation = action.payload;
            state.selectedRegion = null;
        },
        setSelectedRegion: (state, action: PayloadAction<string>) => {
            state.selectedRegion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTimezones.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllTimezones.fulfilled, (state, { payload }) => {
                state.timezones = generateTimezoneObject(payload);
                state.isLoading = false;
            })
            .addCase(getCurrentTimeInTimezone.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(
                getCurrentTimeInTimezone.fulfilled,
                (state, { payload }) => {
                    state.currentTimeResponse = payload;
                    state.isLoading = false;
                }
            );
        // TODO: add rejection cases
    },
});

export const {
    setSelectedArea,
    setSelectedLocation,
    setSelectedRegion,
} = timeState.actions;

export const selectedAreaSelector = (state: RootState) =>
    state.time.selectedArea;
export const selectedLocationSelector = (state: RootState) =>
    state.time.selectedLocation;
export const selectedRegionSelector = (state: RootState) =>
    state.time.selectedRegion;
export const timezonesSelector = (state: RootState) => state.time.timezones;

export default timeState.reducer;
