import { mocked } from "ts-jest/utils";

import * as dropdownUtils from "../dropdown.utils";

const mockedDropdownUtils = mocked(dropdownUtils, true);

type CustomDropdownValue = { label: string; value: string };

describe("test valueToCustomDropdownValue", () => {
    const mockedValueToCustomDropdownValue =
        mockedDropdownUtils.valueToCustomDropdownValue;
    // const mockedValueToCustomDropdownValue = mocked(
    //     dropdownUtils.valueToCustomDropdownValue,
    //     true
    // );

    describe.each([
        ["KEKW", { label: "KEKW", value: "KEKW" }],
        ["SomeValue", { label: "SomeValue", value: "SomeValue" }],
        ["El_Risitas", { label: "El Risitas", value: "El_Risitas" }],
        [
            "Lots_Of_Underscores",
            { label: "Lots Of Underscores", value: "Lots_Of_Underscores" },
        ],
        [
            "Double__Underscores",
            { label: "Double Underscores", value: "Double__Underscores" },
        ],
    ])("%s", (val, expected) => {
        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(
                mockedValueToCustomDropdownValue(val)
            ).toMatchObject<CustomDropdownValue>(expected);
        });
    });
});

describe("test generateSelectOptions", () => {
    const mockedGenerateSelectOptions =
        mockedDropdownUtils.generateSelectOptions;

    // looks like multiple tests, but is only one! No need for .each
    const arrayToTest = [
        "KEKW",
        "SomeValue",
        "El_Risitas",
        "Lots_Of_Underscores",
        "Double__Underscores",
    ];
    const testResults = [
        { label: "KEKW", value: "KEKW" },
        { label: "SomeValue", value: "SomeValue" },
        { label: "El Risitas", value: "El_Risitas" },
        { label: "Lots Of Underscores", value: "Lots_Of_Underscores" },
        { label: "Double Underscores", value: "Double__Underscores" },
    ];

    it("should return the correct array of values", () => {
        expect(mockedGenerateSelectOptions(arrayToTest)).toMatchObject<
            CustomDropdownValue[]
        >(testResults);
    });
});
