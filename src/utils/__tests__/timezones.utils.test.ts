import { mocked } from "ts-jest/utils";

import * as timezonesUtils from "../timezones.utils";

//! If you got here from the comments in the utils file itself, please update the below
//* Note: types do not seem to be resolved correctly, so please write them out rather than use <any>
const localSetObjectValueByPath = (
    object: {
        [x: string]: string | Record<string, string | Record<string, string>>;
    },
    path: string
) => {
    const keys = path.split("/");
    const value = keys.pop();

    if (value) {
        keys.reduce((acc, key) => {
            return (acc[key] = acc[key] || {});
        }, object as any)[value] = value;
    }
};

describe("test generateTimezoneObject", () => {
    const fnToTest = mocked(timezonesUtils.generateTimezoneObject);

    const testData = [
        "America/Anchorage",
        "America/Araguaina",
        "America/Argentina/Buenos_Aires",
        "CET",
    ];
    const expectedResult = {
        America: {
            Anchorage: "Anchorage",
            Araguaina: "Araguaina",
            Argentina: {
                Buenos_Aires: "Buenos_Aires",
            },
        },
        CET: "CET",
    };
    
    it("returns the correct data structure", () => {
        expect(fnToTest(testData)).toEqual(expectedResult);
    });
});

describe("test setObjectValueByPath", () => {
    const mockSetObjectValueByPath = jest.fn() as jest.MockedFunction<
        typeof localSetObjectValueByPath
    >;
    mockSetObjectValueByPath.mockImplementation(localSetObjectValueByPath);

    beforeEach(() => {
        mockSetObjectValueByPath.mockClear();
    });

    it("should work for single level data", () => {
        const initialObject = {};
        const testData = "CET";
        const expectedResult = { CET: "CET" };
        expect(initialObject).not.toBe(testData);
        mockSetObjectValueByPath(initialObject, testData);
        expect(mockSetObjectValueByPath).toBeCalledTimes(1);
        expect(initialObject).toStrictEqual(expectedResult);
    });

    describe.each([
        ["America/Anchorage", { America: { Anchorage: "Anchorage" } }],
        [
            "America/Argentina/Buenos_Aires",
            { America: { Argentina: { Buenos_Aires: "Buenos_Aires" } } },
        ],
    ])("should work for multi level - %s", (val, expected) => {
        it(`returns ${JSON.stringify(expected)}`, () => {
            const initialObject = {};
            expect(initialObject).not.toBe(val);
            mockSetObjectValueByPath(initialObject, val);
            expect(mockSetObjectValueByPath).toBeCalledTimes(1);
            expect(initialObject).toStrictEqual(expected);
        });
    });
});
