import { mocked } from "ts-jest/utils";

import apiTimezones from "./__tests__/apiData.json";

import Service from "./world-time-api.service";

// mocked to avoid API calls
// https://jestjs.io/docs/en/tutorial-async
jest.mock("./world-time-api.service", () => {
    const apiTimezones = require("./__tests__/apiData.json");
    return class {
        timezones = [];
        // shouldResolve is only part of the test mock - it does not exist in the normal implementation
        async getAllTimezones(shouldResolve: boolean = true): Promise<void> {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (shouldResolve) {
                        this.timezones = apiTimezones;
                        return resolve();
                    } else {
                        // reject({Error: "Failed to get timezones"})
                        return reject("Failed to get timezones");
                    }

                    // reject({Error: "Failed to get timezones"});
                    // return;
                });
            });
        }
    };
});

describe("services - world-time-api", () => {
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
