export const generateTimezoneObject = (data: string[]) => {
    const dataObj = {} as Areas;
    data.forEach((item) => {
        setObjectValueByPath(dataObj, item);
    });

    return dataObj;
};

//! As this is not exported, the test for this hard coded
//! If this function is updated, please also update the implementation in the test
const setObjectValueByPath = (object: Areas, path: string) => {
    const keys = path.split("/");
    const value = keys.pop();

    if (value) {
        keys.reduce((acc, key) => {
            return (acc[key] = acc[key] || {});
        }, object as any)[value] = value;
    }
};
