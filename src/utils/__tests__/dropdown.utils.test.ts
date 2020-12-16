import { mocked } from "ts-jest/utils";

import * as dropdownUtils from "../dropdown.utils";

const mockedDropdownUtils = mocked(dropdownUtils, true);

type CustomDropdownValue = { label: string; value: string };

describe("test valueToCustomDropdownValue", () => {
    // const mockedValueToCustomDropdownValue = mockedDropdownUtils.valueToCustomDropdownValue;
    const mockedValueToCustomDropdownValue = mocked(
        dropdownUtils.valueToCustomDropdownValue,
        true
    );

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
        test(`returns ${expected}`, () => {
            expect(
                mockedValueToCustomDropdownValue(val)
            ).toMatchObject<CustomDropdownValue>(expected);
        });
    });
});

describe("test generateSelectOptions", () => {
    const mockedGenerateSelectOptions =
        mockedDropdownUtils.generateSelectOptions;

    xit("Tests to be written", () => {});
});
