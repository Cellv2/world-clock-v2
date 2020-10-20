// http://worldtimeapi.org/api
// http://worldtimeapi.org/pages/schema

import { WorldTimeApiResponseSchema } from "../../models/world-time-api/time.model";

export interface WorldTimeApiServiceConstructor {
    new (): WorldTimeApiService;
}

export interface WorldTimeApiService {
    getAllTimezones: () => Promise<string[]>;
    getCurrentTime: (
        area?: string,
        location?: string,
        region?: string
    ) => Promise<WorldTimeApiResponseSchema>;
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
    // get available timezones
    getAllTimezones = async () => {
        // const request = await fetch(WorldTimeApiEndpoints.BASE_URL + WorldTimeApiEndpoints.TIMEZONES);
        const request = await fetch("https://worldtimeapi.org/api/timezone");
        return (await request.json()) as string[];
    };

    // /timezone/{area}/{location}/{region}
    getCurrentTime = async (
        area?: string,
        location?: string,
        region?: string
    ) => {
        const timezone = [area, location, region].filter(Boolean).join("/");
        const endpoint = Boolean(timezone) ? `timezone/${timezone}` : `ip`;

        const request = await fetch(`https://worldtimeapi.org/api/${endpoint}`);

        return (await request.json()) as WorldTimeApiResponseSchema;
    };
    // TESTS:
    // if no args are passed, it should return with the IP endpoint
};

class Service {
    timezones: string[] = [];

    async getAllTimezones() {
        const request = await fetch("https://worldtimeapi.org/api/timezone");
        this.timezones = (await request.json()) as string[];
        // return (await request.json()) as string[];
    }

    async getCurrentTime(area?: string, location?: string, region?: string) {
        const timezone = [area, location, region].filter(Boolean).join("/");
        const endpoint = Boolean(timezone) ? `timezone/${timezone}` : `ip`;

        const request = await fetch(`https://worldtimeapi.org/api/${endpoint}`);

        return (await request.json()) as WorldTimeApiResponseSchema;
    }
}

export default Service;
