import React from "react";
import { render } from "@testing-library/react";
import FetchCurrentTimeError from "../FetchCurrentTimeError";

it("renders the fetch current time error message", () => {
    const { getByText } = render(<FetchCurrentTimeError />);

    expect(
        getByText(
            /Sorry, it looks like there was a problem with retrieving the requested time/i
        )
    ).toBeInTheDocument();
});
