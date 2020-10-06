// http://worldtimeapi.org/api
// http://worldtimeapi.org/pages/schema

import { WorldTimeApiResponseSchema } from "../../models/world-time-api/time.model";

export interface WorldTimeApiService {
    getAllTimezones: () => Promise<string[]>;
    getCurrentTime: () => Promise<number>;
}
export class WorldTimeApiService implements WorldTimeApiService {
    private _area: string | null = null;
    private _location: string | null = null;
    private _region: string | null = null;
    private _useIp: boolean = false;

    // TODO: fill this in with a get request, perhaps add 'isLoading' property?
    // private readonly _publicIpTimeInfo: WorldTimeApiResponseSchema = {};

    // we use IP on page load, so this will be set and kept
    constructor() {
        this._useIp = true;
    }

    public get area(): string | null {
        return this._area;
    }
    public set area(value: string | null) {
        this._area = value;
    }

    public get location(): string | null {
        return this._location;
    }
    public set location(value: string | null) {
        this._location = value;
    }

    public get region(): string | null {
        return this._region;
    }
    public set region(value: string | null) {
        this._region = value;
    }

    public get useIp(): boolean {
        return this._useIp;
    }
    public set useIp(value: boolean) {
        this._useIp = value;
    }

    // get available timezones
    getAllTimezones = async () => {
        // const request = await fetch(WorldTimeApiEndpoints.BASE_URL + WorldTimeApiEndpoints.TIMEZONES);
        const request = await fetch("https://worldtimeapi.org/api/timezone");
        return (await request.json()) as string[];
    };

    // /timezone/{area}/{location}/{region}:
    // get / set area
    // get / set location
    // get / set region

    // get time for area/region/subregio
    getCurrentTime = async () => {
        return 0;
    };
}
