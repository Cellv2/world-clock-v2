import { mocked } from "ts-jest/utils";

import apiTimezones from "./__tests__/apiData.json";

import Service from "./world-time-api.service";
import { WorldTimeApiResponseSchema } from "../../models/world-time-api/time.model";

// mocked to avoid API calls
// https://jestjs.io/docs/en/tutorial-async
jest.mock("./world-time-api.service", () => {
    const apiTimezones = require("./__tests__/apiData.json");
    const currentTimeData = require("./__tests__/currentTimeData.json") as WorldTimeApiResponseSchema[];
    const Etc_UTC = currentTimeData[0];
    const Europe_Amsterdam = currentTimeData[1];
    const America_Argentina_Salta = currentTimeData[2];

    return class {
        timezones = [];
        async getAllTimezones(): Promise<void> {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    this.timezones = apiTimezones;
                    return resolve();
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
                (item) => item.timezone === timezone ?? "ip"
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
            await mockedService.getAllTimezones();
            expect(spyGetAllTimezones).toHaveBeenCalled();
            expect(spyGetAllTimezones).toHaveBeenCalledTimes(1);

            expect(mockedService.timezones).toEqual(apiTimezones);
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
        it("should only return area", () => {});
        it("should only return area/location", () => {});
        it("should only return area/location/region", () => {});
    });
});
