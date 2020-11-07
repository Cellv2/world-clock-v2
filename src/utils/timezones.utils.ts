export const timezoneObjGenerator = (data: string[]) => {
    const dataObj = {} as Area;
    data.forEach((item) => {
        setValue(dataObj, item);
    });

    return dataObj;
};

const setValue = (object: Area, path: string) => {
    const keys = path.split("/");
    const value = keys.pop();

    if (value) {
        keys.reduce((acc, key) => {
            return (acc[key] = acc[key] || {});
        }, object as any)[value] = value;
    }
};
