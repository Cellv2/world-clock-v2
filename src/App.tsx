import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

import { WorldTimeApiService } from "./services/world-time-api/world-time-api.service";
import { useDispatch } from "react-redux";
import { fetchAllTimezones, getCurrentTimeInTimezone } from "./app/time.slice";

import Clock from "./components/Clock";

import styles from "./App.module.scss";

function App() {
    // const svc = new WorldTimeApiService();
    // svc.getAllTimezones().then(data => console.log(data))

    const dispatch = useDispatch();

    // dispatch(getTimezonesAsync());
    dispatch(fetchAllTimezones());
    dispatch(getCurrentTimeInTimezone());

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Clock />
            </div>
        </div>
    );
}

export default App;
