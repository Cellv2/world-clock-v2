export const generateTimezoneObject = (data: string[]) => {
    const dataObj = {} as Areas;
    data.forEach((item) => {
        setObjectValueByPath(dataObj, item);
    });

    return dataObj;
};

const setObjectValueByPath = (object: Areas, path: string) => {
    const keys = path.split("/");
    const value = keys.pop();

    if (value) {
        keys.reduce((acc, key) => {
            return (acc[key] = acc[key] || {});
        }, object as any)[value] = value;
    }
};
