import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

import { WorldTimeApiService } from "./services/world-time-api/world-time-api.service";
import { useDispatch } from "react-redux";
import { fetchAllTimezones, getCurrentTimeInTimezone } from "./app/time.slice";

function App() {
    // const svc = new WorldTimeApiService();
    // svc.getAllTimezones().then(data => console.log(data))

    const dispatch = useDispatch();

    // dispatch(getTimezonesAsync());
    dispatch(fetchAllTimezones());
    dispatch(getCurrentTimeInTimezone());

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a
                        className="App-link"
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                        className="App-link"
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </a>
                </span>
            </header>
        </div>
    );
}

export default App;
