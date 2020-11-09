// http://worldtimeapi.org/api
// http://worldtimeapi.org/pages/schema

import { WorldTimeApiResponseSchema } from "../../models/world-time-api/time.model";

export interface WorldTimeApiServiceConstructor {
    new (): WorldTimeApiService;
}

export interface WorldTimeApiService {
    getAllTimezones: () => Promise<string[]>;
    getCurrentTime: (
        area: string | null,
        location: string | null,
        region: string | null
    ) => Promise<WorldTimeApiResponseSchema>;
}

// https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes
export const WorldTimeApiService: WorldTimeApiServiceConstructor = class WorldTimeApiService
    implements WorldTimeApiService {
    // get available timezones
    async getAllTimezones() {
        const request = await fetch("https://worldtimeapi.org/api/timezone");
        return (await request.json()) as string[];
    }

    // /timezone/{area}/{location}/{region}
    async getCurrentTime(
        area: string | null,
        location: string | null,
        region: string | null
    ) {
        const timezone = [area, location, region].filter(Boolean).join("/");
        const endpoint = Boolean(timezone) ? `timezone/${timezone}` : `ip`;

        const request = await fetch(`https://worldtimeapi.org/api/${endpoint}`);

        return (await request.json()) as WorldTimeApiResponseSchema;
    }
};

export default WorldTimeApiService;
