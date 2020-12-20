import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";
import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";
import { AppDispatch, RootState } from "./store";
import { generateTimezoneObject } from "../utils";

type TimeState = {
    isLoading: boolean;
    timezones: Areas;
    selectedArea: string | null;
    selectedLocation: string | null;
    selectedRegion: string | null;
    currentTimeResponse: WorldTimeApiResponseSchema | null;
    fetchAllTimezonesHasErrors: boolean;
    getCurrentTimeInTimezoneHasErrors: boolean;
};

const initialState: TimeState = {
    isLoading: true,
    timezones: {},
    selectedArea: null,
    selectedLocation: null,
    selectedRegion: null,
    currentTimeResponse: null,
    fetchAllTimezonesHasErrors: false,
    getCurrentTimeInTimezoneHasErrors: false,
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
        dispatch: AppDispatch;
        state: RootState;
        extra: {
            worldTimeApiService: typeof WorldTimeApiService;
        };
    }
>("time/getCurrentTimeInTimezone", async (_, thunkAPI) => {
    const service = new thunkAPI.extra.worldTimeApiService();
    const {
        selectedArea,
        selectedLocation,
        selectedRegion,
    } = thunkAPI.getState().time;

    return await service.getCurrentTime(
        selectedArea,
        selectedLocation,
        selectedRegion
    );
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
                state.fetchAllTimezonesHasErrors = false;
            })
            .addCase(getCurrentTimeInTimezone.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(
                getCurrentTimeInTimezone.fulfilled,
                (state, { payload }) => {
                    state.currentTimeResponse = payload;
                    state.isLoading = false;
                    state.getCurrentTimeInTimezoneHasErrors = false;
                }
            )
            .addCase(fetchAllTimezones.rejected, (state, action) => {
                state.fetchAllTimezonesHasErrors = true;
            })
            .addCase(getCurrentTimeInTimezone.rejected, (state, action) => {
                state.getCurrentTimeInTimezoneHasErrors = true;
            });
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
export const currentTimeResponseSelector = (state: RootState) =>
    state.time.currentTimeResponse;

export default timeState.reducer;
