import React from "react";

type Props = {};

const FetchAllTimezonesError = (props: Props) => {
    return (
        <>
            <p>
                Sorry, it looks like there was a problem with retrieving the
                timezones
            </p>
            <p>Please try refreshing the page in a moment</p>
        </>
    );
};

export default FetchAllTimezonesError;
