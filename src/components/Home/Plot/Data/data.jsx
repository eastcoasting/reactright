import ECL from "./ECL.json";


export const ECL_data = () => {
    let returnArray = [];

    for (let f of ECL.features) {
        let returnItem = {};
        returnItem.id = f.properties.id;
        returnItem.type = f.properties.ELC_ID_D;
        returnItem.count = f.properties.Shape_Area;
        returnArray.push(returnItem);
    }

    returnArray.sort((a, b) => {
        return a.count - b.count;
    });

    returnArray.reverse();

    return returnArray;
}



export const ECL_data_id = () => {
    let returnArray = [];

    for (let f of ECL.features) {
        let returnItem = {};
        returnItem.id = f.properties.id;
        returnArray.push(returnItem);
    }

    return returnArray;
}


export const ECL_geo_data = () => {
    return ECL;
}


export const color_breaks = () => {

    const alpha = 0.95;

    const colorBreaks = [
        { rgba: [161, 217, 155, alpha], break: 0 },
        { rgba: [116, 196, 118, alpha], break: 100 },
        { rgba: [65, 171, 93, alpha], break: 100000000 },
        { rgba: [35, 139, 69, alpha], break: 150000000 },
        { rgba: [0, 90, 50, alpha], break: 500000000 }
    ];

    return colorBreaks;

}
