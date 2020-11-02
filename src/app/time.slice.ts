import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";
import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";
import { RootState } from "./store";

type Area = Record<string, string | Location>;
type Location = Record<string, string | Region>;
type Region = Record<string, string>;

type TimeState = {
    isLoading: boolean;
    timezones: string[];
    selectedArea: string | null;
    selectedLocation: string | null;
    selectedRegion: string | null;
    currentTimeResponse: WorldTimeApiResponseSchema | null;
    timezoneObj: Area;
};

const initialState: TimeState = {
    isLoading: true,
    timezones: [],
    selectedArea: null,
    selectedLocation: null,
    selectedRegion: null,
    currentTimeResponse: null,
    timezoneObj: {
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
        setTimezones: (state, action: PayloadAction<string[]>) => {
            state.timezones = action.payload;
        },
        setSelectedArea: (state, action: PayloadAction<string>) => {
            state.selectedArea = action.payload;
        },
        setSelectedLocation: (state, action: PayloadAction<string>) => {
            state.selectedLocation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTimezones.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllTimezones.fulfilled, (state, { payload }) => {
                state.timezones = payload;
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

export const { setSelectedArea, setSelectedLocation } = timeState.actions;

export const selectedAreaSelector = (state: RootState) =>
    state.time.selectedArea;
export const selectedLocationSelector = (state: RootState) =>
    state.time.selectedLocation;
export const selectedRegionSelector = (state: RootState) =>
    state.time.selectedRegion;
export const timezoneObjSelector = (state: RootState) => state.time.timezoneObj;

export default timeState.reducer;
