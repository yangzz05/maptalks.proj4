import Projection from "../projection";

export default {
    projection: new Projection("EPSG:32648", "+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs"),
    resolutions: (function () {
        const resolutions = [];
        const d = 2 * 6378137 * Math.PI;    //6370997?
        for (let i = 0; i < 21; i++) {
            resolutions[i] = d / (256 * Math.pow(2, i));
        }
        return resolutions;
    })(),
    fullExtent: {
        left: 166021.44309607433,
        bottom: 0,
        right: 833978.5569039243,
        top: 9329005.18240733
    }
}