import { mocked } from "ts-jest/utils";

import * as stringUtils from "../string.utils";

describe("test replaceSlashAndUnderscore", () => {
    const fnToTest = mocked(stringUtils.replaceSlashAndUnderscore, true);
});

describe("test replaceSlashWithCommaWhitespace", () => {
    const fnToTest = mocked(stringUtils.replaceSlashWithCommaWhitespace, true);
});

describe("test replaceUnderscoreWithWhitespace", () => {
    const fnToTest = mocked(stringUtils.replaceUnderscoreWithWhitespace, true);
    describe.each([
        ["One_Underscore", "One Underscore"],
        ["Two__Underscore", "Two  Underscore"],
        ["THREE___Underscore, ah_ah_ahh", "THREE   Underscore, ah ah ahh"],
        ["'3£'@__AwdasdD_x!!@_", "'3£'@  AwdasdD x!!@ "],
    ])("%s", (val, expected) => {
        it(`returns ${expected}`, () => {
            expect(fnToTest(val)).toBe(expected);
        });
    });
});
