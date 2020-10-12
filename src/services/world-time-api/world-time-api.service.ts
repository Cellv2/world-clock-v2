// http://worldtimeapi.org/api
// http://worldtimeapi.org/pages/schema

import { WorldTimeApiResponseSchema } from "../../models/world-time-api/time.model";

export interface WorldTimeApiServiceConstructor {
    new (): WorldTimeApiService;
}

export interface WorldTimeApiService {
    getAllTimezones: () => Promise<string[]>;
    getCurrentTime: () => Promise<number>;
}

// export function createWorldTimeApiService (
//     ctor: WorldTimeApiServiceConstructor
// ): WorldTimeApiService  {
//     return new ctor();
// };

// export class WorldTimeApiService implements WorldTimeApiService {
// https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes
export const WorldTimeApiService: WorldTimeApiServiceConstructor = class WorldTimeApiService
    implements WorldTimeApiService {
    private _useIp: boolean = false;

    // TODO: fill this in with a get request, perhaps add 'isLoading' property?
    // private readonly _publicIpTimeInfo: WorldTimeApiResponseSchema = {};

    // we use IP on page load, so this will be set and kept
    constructor() {
        this._useIp = true;
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
    getCurrentTime = async () => {
        return 0;
    };
};

class Service {
    timezones: string[] = [];

    async getAllTimezones() {
        const request = await fetch("https://worldtimeapi.org/api/timezone");
        this.timezones = (await request.json()) as string[];
        // return (await request.json()) as string[];
    }
}

export default Service;
