import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "../features/counter/counterSlice";

import { WorldTimeApiService } from "../services/world-time-api/world-time-api.service";

import timeReducer from "./time.slice";
import notificationReducer from "./notification.slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        time: timeReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    worldTimeApiService: WorldTimeApiService,
                },
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); //hook to resolve dispatch types
