# flatlands

[![Build Status](https://travis-ci.org/cspanring/flatlands.svg)](https://travis-ci.org/cspanring/flatlands)

Transforms a 3D GeoJSON feature geometry to 2D.

## Usage

    var flatlands = require('flatlands');

    var multipolygon = {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [102.0, 2.0, 0],
            [103.0, 2.0, 0],
            [103.0, 3.0, 0],
            [102.0, 3.0, 0],
            [102.0, 2.0, 0]
          ]
        ],
        [
          [
            [100.0, 0.0, 0],
            [101.0, 0.0, 0],
            [101.0, 1.0, 0],
            [100.0, 1.0, 0],
            [100.0, 0.0, 0]
          ],
          [
            [100.2, 0.2, 0],
            [100.8, 0.2, 0],
            [100.8, 0.8, 0],
            [100.2, 0.8, 0],
            [100.2, 0.2, 0]
          ]
        ]
      ]
    };

    var feature = flatlands(multipolygon);

Returns:

    {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [102, 2],
            [103, 2],
            [103, 3],
            [102, 3],
            [102, 2]
          ]
        ],
        [
          [
            [100, 0],
            [101, 0],
            [101, 1],
            [100, 1],
            [100, 0]
          ],
          [
            [100.2, 0.2],
            [100.8, 0.2],
            [100.8, 0.8],
            [100.2, 0.8],
            [100.2, 0.2]
          ]
        ]
      ]
    }
