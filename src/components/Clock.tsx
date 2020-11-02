import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";

import ClockFace from "./ClockFace";
import AreaSelect from "./AreaSelect";
import LocationSelect from "./LocationSelect";
import SubRegionSelect from "./SubRegionSelect";

import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";
import { handleFetchErrors } from "../helpers/error-helpers";
import {
    fetchAllTimezones,
    getCurrentTimeInTimezone,
    selectedAreaSelector,
    selectedLocationSelector,
    selectedRegionSelector,
    timezoneObjSelector,
} from "../app/time.slice";

type Props = {};
type State = {
    errorObj: {
        activeError: boolean;
        error: any;
    };
    time: WorldTimeApiResponseSchema;
    areas: string[];
    selectedArea: string | null;
    regions: string[] | WorldTimeApiResponseSchema;
    selectedRegion: string | null;
    subRegions: string[]; // this should be a string like 'region/subregion', so you will need to split it
    selectedSubRegion: string | null;
    timeZones: string[];
    usingIP: boolean;
};

type Area = Record<string, string | Location>;
type Location = Record<string, string | Region>;
type Region = Record<string, string>;

const x: Area = {
    America: {
        Adak: "Adak",
        Anchorage: "Anchorage",
        Argentina: {
            Catamarca: "Catamarca",
        },
    },
    CET: "CET",
};

const Clock = () => {
    const dispatch = useDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);

    useEffect(() => {
        // dispatch(fetchAllTimezones());
        // dispatch(getCurrentTimeInTimezone());
    }, [dispatch]);

    // console.log({...testData})

    return (
        <>
            <p>Testing</p>
            <AreaSelect />
            {selectedArea && <LocationSelect />}
        </>
    );
};

const gen = (input: string[]) => {
    // check whether there is a child
    // if no, add to object
    // if yes, create key and add an object
    let obj = {} as Area;
    // input.forEach(item => {
    //     const split = item.split("/");
    //     const key = split[0];
    //     if (split.length === 1) {
    //         obj[key] = key
    //     } else {
    //         const popped = split.slice(1, split.length);
    //         obj[key] = gen(popped)
    //     }
    // })

    // /timezone/{area}/{location}/{region}
    const timezonesObj = input.reduce((acc, item) => {
        const timezone = item.split("/");
        const area = timezone[0]; //this should always exists
        if (timezone.length === 1) {
            acc[area] = area;
        } else if (timezone.length === 2) {
            const location = timezone[1];
            acc[area] = {
                location,
            };
        } else if (timezone.length === 3) {
            const location = timezone[1];
            const region = timezone[2];
            acc[area] = {
                location: {
                    region,
                },
            };
        }
        return acc;
    }, {} as Area);

    return timezonesObj;
};

// class Clock extends Component<Props, State> {
//     timer!: NodeJS.Timeout;

//     componentDidMount() {
//         const initialTZ = "ip";

//         fetch("https://worldtimeapi.org/api/timezone")
//             .then(handleFetchErrors)
//             .then((json: string[]) => {
//                 // response will always be area/region per the API schema, so we want arr[0]
//                 const areas: string[] = json.map((area) => {
//                     return area.split("/")[0];
//                 });
//                 const uniqueAreas = [...Array.from(new Set(areas))];

//                 this.setState(
//                     {
//                         timeZones: json,
//                         areas: uniqueAreas,
//                         selectedArea: null,
//                         errorObj: {
//                             activeError: false,
//                             error: null,
//                         },
//                     },
//                     () => this.fetchTime(initialTZ)
//                 );
//             })
//             .catch((err: any) => {
//                 console.error(
//                     "Something went wrong with the request - Is the API down for maintenance? The error is: "
//                 );
//                 console.error(err);

//                 this.setState((prevState) => ({
//                     ...prevState,
//                     errorObj: {
//                         activeError: true,
//                         error: err,
//                     },
//                 }));
//             });
//     }

//     componentWillUnmount() {
//         clearInterval(this.timer);
//     }

//     fetchTime = (tZ: string) => {
//         const baseApiUrl = "https://worldtimeapi.org/api";

//         // a call to IP does not include /timezone, so we need to do a check to see
//         const apiToCall =
//             tZ !== "ip"
//                 ? `${baseApiUrl}/timezone/${tZ}`
//                 : `${baseApiUrl}/${tZ}`;

//         fetch(apiToCall)
//             .then(handleFetchErrors)
//             .then((json: WorldTimeApiResponseSchema) => {
//                 const _tempUsingIp: boolean = tZ === "ip";

//                 this.setState({
//                     time: json,
//                     usingIP: _tempUsingIp,
//                 });
//             })
//             .catch((err) => console.error(err));
//     };

//     handleAreaOnChange = (
//         event: ValueType<{ value: string; label: string }>
//     ) => {
//         const value = (event as {
//             value: string;
//             label: string;
//         }).value;

//         fetch(`https://worldtimeapi.org/api/timezone/${value}`)
//             .then(handleFetchErrors)
//             .then((json: string[] | WorldTimeApiResponseSchema) => {
//                 //if it's an array then it's got regions as well, else we update the time
//                 if (Array.isArray(json)) {
//                     // response should be timezone/region/subregion
//                     // we already have the timezones, so we want both region ([1]) and subregion if available ([2])
//                     let regions: string[] = [];
//                     let subRegions: string[] = [];
//                     json.forEach((item: string) => {
//                         const splitItem = item.split("/");
//                         if (splitItem.length > 2) {
//                             regions.push(splitItem[1]);
//                             subRegions.push(`${splitItem[1]}/${splitItem[2]}`);
//                         } else {
//                             regions.push(splitItem[1]);
//                         }
//                     });

//                     const uniqueRegions = [...Array.from(new Set(regions))];

//                     this.setState((prevState) => ({
//                         ...prevState,
//                         regions: uniqueRegions,
//                         selectedRegion: null,
//                         subRegions: subRegions,
//                     }));
//                 } else {
//                     // used in case the result is actually a time zone (such as 'CET' or 'EST')
//                     this.setState(
//                         (prevState) => ({
//                             ...prevState,
//                             regions: json,
//                             subRegions: [],
//                         }),
//                         () => this.fetchTime(value)
//                     );
//                 }
//             })
//             .catch((err) => console.error(err));

//         this.setState((prevState) => ({
//             ...prevState,
//             selectedArea: value,
//         }));
//     };

//     handleRegionOnChange = (
//         event: ValueType<{ value: string; label: string }>
//     ) => {
//         const value = (event as { value: string; label: string }).value;

//         this.setState(
//             (prevState) => ({
//                 ...prevState,
//                 selectedRegion: value,
//                 selectedSubRegion: null,
//             }),
//             () => {
//                 // need to do this here as selectedRegion is actually set in the setState directly above
//                 let filteredSubRegions: string[] = [];
//                 if (
//                     this.state.subRegions &&
//                     this.state.subRegions.length > 0 &&
//                     this.state.selectedRegion
//                 ) {
//                     filteredSubRegions = this.state.subRegions.filter(
//                         (subRegion) => {
//                             return (
//                                 subRegion.split("/")[0] ===
//                                 this.state.selectedRegion
//                             );
//                         }
//                     );
//                 }

//                 if (filteredSubRegions.length === 0) {
//                     this.fetchTime(
//                         `${this.state.selectedArea}/${this.state.selectedRegion}`
//                     );
//                 }
//             }
//         );
//     };

//     // TODO: ??
//     // This could be done nicer, and even merged into handleRegionOnChange through a 'type' param, but is it worth it for like 10 lines of code?
//     handleSubRegionOnChange = (
//         event: ValueType<{ value: string; label: string }>
//     ) => {
//         const value = (event as { value: string; label: string }).value;
//         this.setState(
//             (prevState) => ({
//                 ...prevState,
//                 selectedSubRegion: value,
//             }),
//             () =>
//                 this.fetchTime(
//                     `${this.state.selectedArea}/${this.state.selectedSubRegion}`
//                 )
//         );
//     };

//     render() {
//         if (this.state !== null && this.state.errorObj.activeError) {
//             return (
//                 <div>
//                     <p>
//                         Sorry, something went wrong when trying to hit the APIs
//                     </p>
//                     <p>
//                         Is{" "}
//                         <a href="http://worldtimeapi.org/">
//                             <em>worldtimeapi.org/</em>
//                         </a>{" "}
//                         down?
//                     </p>
//                     <p>The error was: {this.state.errorObj.error.stack}</p>
//                 </div>
//             );
//         } else if (
//             this.state === null ||
//             this.state.time === null ||
//             this.state.time === undefined ||
//             this.state.timeZones === null ||
//             this.state.areas === null
//         ) {
//             return <div>Reaching out to the APIs...</div>;
//         } else {
//             let filteredSubRegions: string[] = [];
//             if (
//                 this.state.subRegions &&
//                 this.state.subRegions.length > 0 &&
//                 this.state.selectedRegion
//             ) {
//                 filteredSubRegions = this.state.subRegions.filter(
//                     (subRegion) => {
//                         return (
//                             subRegion.split("/")[0] ===
//                             this.state.selectedRegion
//                         );
//                     }
//                 );
//             }

//             return (
//                 <>
//                     <ClockFace
//                         time={this.state.time}
//                         usingIp={this.state.usingIP}
//                     />
//                     <br />
//                     <AreaSelect
//                         areas={this.state.areas}
//                         selectedArea={this.state.selectedArea}
//                         handleAreaOnChange={this.handleAreaOnChange}
//                     />
//                     {this.state.regions && (
//                         <RegionSelect
//                             regions={this.state.regions}
//                             selectedRegion={this.state.selectedRegion}
//                             handleRegionOnChange={this.handleRegionOnChange}
//                         />
//                     )}
//                     {filteredSubRegions.length > 0 && (
//                         <SubRegionSelect
//                             subRegions={filteredSubRegions}
//                             selectedSubRegion={this.state.selectedSubRegion}
//                             handleSubRegionOnChange={
//                                 this.handleSubRegionOnChange
//                             }
//                         />
//                     )}
//                 </>
//             );
//         }
//     }
// }

export default Clock;
