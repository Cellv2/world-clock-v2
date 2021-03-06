import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchAllTimezones, getCurrentTimeInTimezone } from "./time.slice";

type NotificationTypes = "error" | "success" | "warning" | "information";

type Notification = {
    message: string;
    type: NotificationTypes;
};

type NotificatonState = {
    notifications: Notification[];
};

const initialState: NotificatonState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        createNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTimezones.rejected, (state, action) => {
                const notification = {
                    message: action.error.message,
                    type: "error",
                } as Notification;
                state.notifications.push(notification);
            })
            .addCase(getCurrentTimeInTimezone.rejected, (state, action) => {
                const notification = {
                    message: action.error.message,
                    type: "error",
                } as Notification;
                state.notifications.push(notification);
            });
    },
});

export const notificationsSelector = (state: RootState) =>
    state.notification.notifications;

export default notificationSlice.reducer;
