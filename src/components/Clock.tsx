import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClockFace from "./ClockFace";
import AreaSelect from "./AreaSelect";
import LocationSelect from "./LocationSelect";
import RegionSelect from "./RegionSelect";

import {
    fetchAllTimezones,
    getCurrentTimeInTimezone,
    selectedAreaSelector,
    selectedLocationSelector,
} from "../app/time.slice";

type Props = {};

const Clock = (props: Props) => {
    const dispatch = useDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);

    useEffect(() => {
        // dispatch(fetchAllTimezones());
        // dispatch(getCurrentTimeInTimezone());
    }, [dispatch]);

    const x = async () => {
        const call = await fetch("https://worldtimeapi.org/api/timezone");
        const data = await call.json();
        console.log(timezoneObjGenerator(data));
    };

    x();

    return (
        <>
            <p>Testing</p>
            <AreaSelect />
            {selectedArea && <LocationSelect />}
            {selectedArea && selectedLocation && <RegionSelect />}
        </>
    );
};

type Area = Record<string, string | Location>;
type Location = Record<string, string | Region>;
type Region = Record<string, string>;

const testData = [
    "CET",
    "America/Adak",
    "America/Anchorage",
    "America/Argentina/Catamarca",
];

const tzObj: Area = {
    America: {
        Adak: "Adak",
        Anchorage: "Anchorage",
        Argentina: {
            Catamarca: "Catamarca",
        },
    },
    CET: "CET",
};

const timezoneObjGenerator = (data: string[]) => {
    const dataObj = {} as Area;
    data.forEach((item) => {
        setValue(dataObj, item);
    });

    return dataObj;
};

const setValue = (object: Area, path: string) => {
    const keys = path.split("/");
    const value = keys.pop();

    if (value) {
        keys.reduce((acc, key) => {
            return (acc[key] = acc[key] || {});
        }, object as any)[value] = value;
    }
};

export default Clock;
