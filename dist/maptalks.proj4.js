/*!
 * maptalks.proj4 v1.0.0
 * LICENSE : BSD-2-Clause
 * (c) 2019-2019 Zhi Yang
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('proj4'), require('maptalks')) :
    typeof define === 'function' && define.amd ? define(['exports', 'proj4', 'maptalks'], factory) :
    (global = global || self, factory((global.maptalks = global.maptalks || {}, global.maptalks.proj4 = {}), global.proj4, global.maptalks));
}(this, function (exports, proj4, maptalks) { 'use strict';

    proj4 = proj4 && proj4.hasOwnProperty('default') ? proj4['default'] : proj4;

    var Projection = function () {
      function Projection(code, def) {
        this.code = code;
        proj4.defs(code, def);
        this._proj = proj4(code);
      }

      var _proto = Projection.prototype;

      _proto.project = function project(latlng) {
        var point = this._proj.forward(latlng.toArray());

        return new maptalks.Coordinate(point);
      };

      _proto.unproject = function unproject(point) {
        var latlng = this._proj.inverse(point.toArray());

        return new maptalks.Coordinate(latlng);
      };

      return Projection;
    }();

    var EPSG32648 = {
      projection: new Projection("EPSG:32648", "+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs"),
      resolutions: function () {
        var resolutions = [];
        var d = 2 * 6378137 * Math.PI;

        for (var i = 0; i < 21; i++) {
          resolutions[i] = d / (256 * Math.pow(2, i));
        }

        return resolutions;
      }(),
      fullExtent: {
        left: 166021.44309607433,
        bottom: 0,
        right: 833978.5569039243,
        top: 9329005.18240733
      }
    };

    exports.EPSG32648 = EPSG32648;
    exports.Projection = Projection;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
