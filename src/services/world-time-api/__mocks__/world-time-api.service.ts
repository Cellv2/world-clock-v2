export default {
    WorldTimeApiService: jest.fn().mockImplementation(() => {
        return {
            getAllTimezones: jest.fn(() => {
                return ["test"];
            }),
            getCurrentTime: jest.fn(),
        };
    }),
};
