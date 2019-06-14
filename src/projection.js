import proj4 from 'proj4';
import {Coordinate} from 'maptalks';

export default class Projection {
    constructor(code, def) {
        this.code = code;
        proj4.defs(code, def);
        this._proj = proj4(code);
    }

    project(latlng) {
        var point = this._proj.forward(latlng.toArray());
        return new Coordinate(point);
    }

    unproject(point) {
        var latlng = this._proj.inverse(point.toArray());
        return new Coordinate(latlng);
    }
}