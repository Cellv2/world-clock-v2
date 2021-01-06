import React from "react";
import { render } from "@testing-library/react";
import FetchAllTimezonesError from "../FetchAllTimezonesError";

it("renders fetch all timezones error message", () => {
    const { getByText } = render(<FetchAllTimezonesError />);

    expect(
        getByText(
            /Sorry, it looks like there was a problem with retrieving the timezones/i
        )
    ).toBeInTheDocument();
});
