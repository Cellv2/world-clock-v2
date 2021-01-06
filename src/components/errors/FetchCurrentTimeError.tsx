import React from "react";

type Props = {};

const FetchCurrentTimeError = (props: Props) => {
    return (
        <>
            <p>
                Sorry, it looks like there was a problem with retrieving the
                requested time
            </p>
            <p>Please try refreshing the page in a moment</p>
        </>
    );
};

export default FetchCurrentTimeError;
