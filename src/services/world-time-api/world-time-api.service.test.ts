import { mocked } from 'ts-jest/utils'
import { WorldTimeApiService } from "./world-time-api.service";
// jest.mock("./world-time-api.service", () => jest.fn());
// jest.mock("./world-time-api.service");

jest.mock("./world-time-api.service", () => {
    // return { getAllTimezones: jest.fn(), getCurrentTime: jest.fn() };
    return {
        WorldTimeApiService: jest.fn().mockImplementation(() => {
            return {
                getAllTimezones: jest.fn(() => { return ["test"]}),
                getCurrentTime: jest.fn(),
            };
        }),
    };
});

// jest.mock("./world-time-api.service", () => {
//     return {
//         WorldTimeApiService: jest.fn().mockImplementation(() => {
//             return {
//                 getAllTimezones: () => {},
//             };
//         }),
//     };
// });

// jest.mock('../../../adapters/Cache', () => jest.fn())
// const Cache = require('../../../adapters/Cache')
// const Fizz = require('../Fizz')

// const retrieveRecords = jest.fn()
// Cache.mockImplementation(() => ({retrieveRecords})



// describe('CACHE', () => {
//   it('should return a mock', () => {
//     const fizz = new Fizz()
//     fizz.doStuff()
//     expect(retrieveRecords).toHaveBeenCalledTimes(1)
//   })
// })



describe("services - world-time-api", () => {
    const MockedWorldTimeApiService = mocked(WorldTimeApiService, true);
    const getAllTimezones = jest.fn();
    const getCurrentTime = jest.fn();
    // MockedWorldTimeApiService.mockImplementation(() => ({getAllTimezones, getCurrentTime}))
    
    // @ts-expect-error
    // MockedWorldTimeApiService.mockImplementation(() => {
    //     return {
    //         getAllTimezones: () => {return ""}
    //     }
    // })
    
    
    beforeEach(() => {
        MockedWorldTimeApiService.mockClear();
        
    })

    // console.log(MockedWorldTimeApiService)

    it("should call the constructor", () => {
        // TS doesn't like mocking for some reason apparently
        //@ts-expect-error
        const mock = new MockedWorldTimeApiService();
        // console.log(mock.getAllTimezones())
        // console.log(MockedWorldTimeApiService.mock.instances[0])
        const mockInstance = MockedWorldTimeApiService.mock.instances[0];
        // console.log(MockedWorldTimeApiService.prototype.getAllTimezones())
        // expect(mockInstance.getAllTimezones()).toReturn()
        // console.log(mockInstance. )
        // console.log(mockInstance.getAllTimezones())

        // (mockInstance.getAllTimezones as jest.Mock).mockImplementationOnce((): string[] => {
        //     return ["Mock 1", "Mock 2"];
        // })

        expect(MockedWorldTimeApiService.mock.instances[0].getAllTimezones()).toEqual(["Mock 1", "Mock 2"])

    })

    


    // it("should return a string[] of timezones", () => {
    //     const exampleTimezones = [
    //         "Africa/Abidjan",
    //         "Africa/Accra",
    //         "Africa/Algiers",
    //         "Africa/Bissau",
    //         "Africa/Cairo",
    //         "Africa/Casablanca",
    //         "Africa/Ceuta",
    //         "Africa/El_Aaiun",
    //         "Africa/Johannesburg",
    //         "Africa/Juba",
    //         "Africa/Khartoum",
    //         "Africa/Lagos",
    //         "Africa/Maputo",
    //         "Africa/Monrovia",
    //         "Africa/Nairobi",
    //         "Africa/Ndjamena",
    //         "Africa/Sao_Tome",
    //         "Africa/Tripoli",
    //         "Africa/Tunis",
    //         "Africa/Windhoek",
    //         "America/Adak",
    //         "America/Anchorage",
    //         "America/Araguaina",
    //         "America/Argentina/Buenos_Aires",
    //         "America/Argentina/Catamarca",
    //         "America/Argentina/Cordoba",
    //         "America/Argentina/Jujuy",
    //         "America/Argentina/La_Rioja",
    //     ];
    // });

    it("should set _useIp to true on construction", () => {});
});
