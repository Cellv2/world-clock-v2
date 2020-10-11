import { mocked } from "ts-jest/utils";

import Service from "./world-time-api.service";
import apiTimezones from "./__tests__/apiData.json";

describe("services - world-time-api", () => {
    const service = new Service();
    const mockedService = mocked(service, true);

    it("has more tests, precious", async () => {
        const spyGetAllTimezones = jest.spyOn(mockedService, "getAllTimezones");
        await mockedService.getAllTimezones(); // this is not a good idea (it calls an actual API), but I'm still learning

        expect(spyGetAllTimezones).toHaveBeenCalled();
        expect(spyGetAllTimezones).toHaveBeenCalledTimes(1);

        expect(mockedService.timezones).toEqual(apiTimezones);
    });

    xit("SHOULD BE TESTED!", () => {});
    xit("should set _useIp to true on construction", () => {});
    xit("should call the constructor", () => {});
    xit("should return a string[] of timezones", () => {});
    xit("should set _useIp to true on construction", () => {});
});
