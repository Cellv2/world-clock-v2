/**
 * ! FILE IS A TRAINWRECK :)
 * ! COMMENTING OUT ALL TESTS
 */

import { mocked } from 'ts-jest/utils'
import { WorldTimeApiService } from "./world-time-api.service";

import Service from './world-time-api.service'

import apiTimezones from './__tests__/apiData.json'

// jest.mock("./world-time-api.service", () => jest.fn());
// jest.mock("./world-time-api.service");
// jest.mock("./world-time-api.service");

// jest.mock("./world-time-api.service", () => {
//     return {
//         getAllTimezones: jest.fn(() => { return 42})
//     }
// });


// jest.mock("./world-time-api.service", () => {
//     return {
//         WorldTimeApiService: jest.fn().mockImplementation(() => {
//             return {
//                 getAllTimezones: () => {},
//             };
//         }),
//     };
// });


// console.log(mocked(WorldTimeApiService));



describe("services - world-time-api", () => {
    const service = new Service();
    const mockedService = mocked(service, true)

    fit("has more tests, precious", async () => {
        // jest.mock()

        // await service.getAllTimezones();

        // mockedService.getAllTimezones.mockImplementation(() => { return Promise.resolve<string[]>([""])})

        const spyGetAllTimezones = jest.spyOn(mockedService, "getAllTimezones");
        await mockedService.getAllTimezones(); // this is not a good idea (it calls an actual API), but I'm still learning

        expect(spyGetAllTimezones).toHaveBeenCalled();
        expect(spyGetAllTimezones).toHaveBeenCalledTimes(1);

        expect(mockedService.timezones).toEqual(apiTimezones);

        // spyGetAllTimezones.mockResolvedValue(apiTimezones)
        // expect(spyGetAllTimezones).toMatchObject(apiTimezones)
    })
 

    it("SHOULD BE TESTED!", () => {})
    // it("should set _useIp to true on construction", () => {});
    // // it("should return a string[] of timezones", () => {

    // beforeEach(() => {
    //     MockedWorldTimeApiService.mockClear();
        
    // })



    // const MockedWorldTimeApiService = mocked(WorldTimeApiService, true);
    // const getAllTimezones = jest.fn();
    // const getCurrentTime = jest.fn();
    // // MockedWorldTimeApiService.mockImplementation(() => ({getAllTimezones, getCurrentTime}))
    
    // // @ts-expect-error
    // // MockedWorldTimeApiService.mockImplementation(() => {
    // //     return {
    // //         getAllTimezones: () => {return ""}
    // //     }
    // // })
    
    


    // // console.log(MockedWorldTimeApiService)

    // it("should call the constructor", () => {

        
    // jest.mock("./world-time-api.service", () => {
    //     return {
    //         WorldTimeApiService: jest.fn().mockImplementation(() => {
    //             return {
    //                 getAllTimezones: () => {},
    //             };
    //         }),
    //     };
    // });

    // const MockedWorldTimeApiService = mocked(WorldTimeApiService, true);


    //     // TS doesn't like mocking for some reason apparently
    //     //@ts-expect-error
    //     const mock = new MockedWorldTimeApiService();
    //     // console.log(mock.getAllTimezones())
    //     // console.log(MockedWorldTimeApiService.mock.instances[0])
    //     const mockInstance = MockedWorldTimeApiService.mock.instances[0];
    //     // console.log(MockedWorldTimeApiService.prototype.getAllTimezones())
    //     // expect(mockInstance.getAllTimezones()).toReturn()
    //     // console.log(mockInstance. )
    //     // console.log(mockInstance.getAllTimezones())

    //     // (mockInstance.getAllTimezones as jest.Mock).mockImplementationOnce((): string[] => {
    //     //     return ["Mock 1", "Mock 2"];
    //     // })

    //     // console.log(MockedWorldTimeApiService.mock.instances[0])

    //     // expect(MockedWorldTimeApiService.mock.instances[0].getAllTimezones()).toEqual(["Mock 1", "Mock 2"])

    // })

    


    // // it("should return a string[] of timezones", () => {
    // //     const exampleTimezones = [
    // //         "Africa/Abidjan",
    // //         "Africa/Accra",
    // //         "Africa/Algiers",
    // //         "Africa/Bissau",
    // //         "Africa/Cairo",
    // //         "Africa/Casablanca",
    // //         "Africa/Ceuta",
    // //         "Africa/El_Aaiun",
    // //         "Africa/Johannesburg",
    // //         "Africa/Juba",
    // //         "Africa/Khartoum",
    // //         "Africa/Lagos",
    // //         "Africa/Maputo",
    // //         "Africa/Monrovia",
    // //         "Africa/Nairobi",
    // //         "Africa/Ndjamena",
    // //         "Africa/Sao_Tome",
    // //         "Africa/Tripoli",
    // //         "Africa/Tunis",
    // //         "Africa/Windhoek",
    // //         "America/Adak",
    // //         "America/Anchorage",
    // //         "America/Araguaina",
    // //         "America/Argentina/Buenos_Aires",
    // //         "America/Argentina/Catamarca",
    // //         "America/Argentina/Cordoba",
    // //         "America/Argentina/Jujuy",
    // //         "America/Argentina/La_Rioja",
    // //     ];
    // // });

    // it("should set _useIp to true on construction", () => {});
});
