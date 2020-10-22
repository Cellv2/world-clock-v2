import { mocked } from "ts-jest/utils";

import apiTimezones from "./__tests__/apiData.json";
import currentTimeData from "./__tests__/currentTimeData.json";

import Service from "./world-time-api.service";
import { WorldTimeApiResponseSchema } from "../../models/world-time-api/time.model";

// mocked to avoid API calls
// https://jestjs.io/docs/en/tutorial-async
jest.mock("./world-time-api.service", () => {
    const apiTimezones = require("./__tests__/apiData.json");
    const currentTimeData = require("./__tests__/currentTimeData.json") as WorldTimeApiResponseSchema[];

    return class {
        async getAllTimezones(): Promise<void> {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    return resolve(apiTimezones);
                });
            });
        }
        async getCurrentTime(
            area?: string,
            location?: string,
            region?: string
        ): Promise<WorldTimeApiResponseSchema> {
            const timezone = [area, location, region].filter(Boolean).join("/");
            const endpoint = Boolean(timezone) ? `timezone/${timezone}` : `ip`;
            const data = currentTimeData.find(
                (item) => item.timezone === endpoint
            );

            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    return resolve(data);
                });
            });
        }
    };
});

describe("services - world-time-api - getAllTimezones", () => {
    const service = new Service();
    const mockedService = mocked(service, true);
    const spyGetAllTimezones = jest.spyOn(mockedService, "getAllTimezones");

    beforeEach(() => {
        // avoid shared spy calls from bleeding across tests
        jest.clearAllMocks();
    });

    describe("should set timezones array when resolving", () => {
        it("should resolve", () => {
            expect(mockedService.getAllTimezones()).resolves.not.toThrow();
        });

        it("should set timezones", async () => {
            const timezones = await mockedService.getAllTimezones();
            expect(spyGetAllTimezones).toHaveBeenCalled();
            expect(spyGetAllTimezones).toHaveBeenCalledTimes(1);

            expect(timezones).toEqual(apiTimezones);
        });
    });

    it("should throw an error when rejecting", async () => {
        mockedService.getAllTimezones.mockImplementationOnce(async () => {
            return Promise.reject(new Error("Failed to get timezones"));
        });

        expect(mockedService.getAllTimezones()).rejects.toThrow(
            new Error("Failed to get timezones")
        );

        expect(spyGetAllTimezones).toHaveBeenCalled();
        expect(spyGetAllTimezones).toHaveBeenCalledTimes(1);
    });

    xit("SHOULD BE TESTED!", () => {});
    xit("should set _useIp to true on construction", () => {});
    xit("should call the constructor", () => {});
    xit("should return a string[] of timezones", () => {});
    xit("should set _useIp to true on construction", () => {});
});

describe("services - world-time-api - getCurrentTime", () => {
    const service = new Service();
    const mockedService = mocked(service, true);
    const spy = jest.spyOn(mockedService, "getCurrentTime");

    beforeEach(() => {
        // avoid shared spy calls from bleeding across tests
        jest.clearAllMocks();
    });

    it("should resolve", () => {
        expect(
            mockedService.getCurrentTime("Europe", "Amsterdam")
        ).resolves.not.toThrow();
    });

    it("should reject if the timezone is invalid", () => {});

    describe("should return the timezone data requested", () => {
        it("should only return area", async () => {
            const data = await mockedService.getCurrentTime("Etc/UTC");

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(); // ip test
            expect(spy).toHaveBeenCalledWith("Etc/UTC");

            expect(data).toEqual(currentTimeData[0]); // check against hard coded data
        });

        it("should only return area/location", async () => {
            const data = await mockedService.getCurrentTime(
                "Europe",
                "Amsterdam"
            );

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(); // ip test
            expect(spy).toHaveBeenCalledWith("Europe", "Amsterdam");

            expect(data).toEqual(currentTimeData[1]); // check against hard coded data
        });

        it("should only return area/location/region", async () => {
            const data = await mockedService.getCurrentTime(
                "America",
                "Argentina",
                "Salta"
            );

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(); // ip test
            expect(spy).toHaveBeenCalledWith("America", "Argentina", "Salta");

            expect(data).toEqual(currentTimeData[2]); // check against hard coded data
        });

        it("should return IP with no args", async () => {
            const data = await mockedService.getCurrentTime();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toBeCalledWith("Europe/London");
            expect(spy).toHaveBeenCalledWith();

            expect(data).toEqual(currentTimeData[3]);
        });
    });
});
