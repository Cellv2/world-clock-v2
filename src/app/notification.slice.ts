import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

const setActiveError = createAction<Notification>("setActiveError");

// TODO: correctly type this

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
        builder.addCase(setActiveError, (state, action) => {
            const notification = {
                message: action.payload.message,
                type: "error",
            } as Notification;
            state.notifications.push(action.payload);
        });
    },
});

export default notificationSlice.reducer;
