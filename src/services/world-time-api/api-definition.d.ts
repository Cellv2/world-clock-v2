enum WorldTimeApiEndpoints {
    BASE_URL = "https://worldtimeapi.org/",
    TIMEZONES = "api/timezone",
    IP = "api/ip",
}

type Areas = Record<string, string | Locations>;
type Locations = Record<string, string | Regions>;
type Regions = Record<string, string>; //! index typing may fail - https://github.com/microsoft/TypeScript/issues/21760
