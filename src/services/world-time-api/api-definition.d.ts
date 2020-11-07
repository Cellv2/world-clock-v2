enum WorldTimeApiEndpoints {
    BASE_URL = "https://worldtimeapi.org/",
    TIMEZONES = "api/timezone",
    IP = "api/ip",
}

type Area = Record<string, string | Location>;
type Location = Record<string, string | Region>;
type Region = Record<string, string>;
