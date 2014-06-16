var test = require('tape');
var flatlands = require('./');
var geojsonCoords = require('geojson-coords');

// GeoJSON.org examples with Z coordinates
var point = { "type": "Point", "coordinates": [100.0, 0.0, 0] };

var linestring = { "type": "LineString", "coordinates": [ [100.0, 0.0, 0], [101.0, 1.0, 0] ]};

var polygon = { "type": "Polygon", "coordinates": [ [ [100.0, 0.0, 0], [101.0, 0.0, 0], [101.0, 1.0, 0], [100.0, 1.0, 0], [100.0, 0.0, 0] ] ] };

var doughnut = { "type": "Polygon", "coordinates": [ [ [100.0, 0.0, 0], [101.0, 0.0, 0], [101.0, 1.0, 0], [100.0, 1.0, 0], [100.0, 0.0, 0] ], [ [100.2, 0.2, 0], [100.8, 0.2, 0], [100.8, 0.8, 0], [100.2, 0.8, 0], [100.2, 0.2, 0] ] ] };

var multipoint = { "type": "MultiPoint", "coordinates": [ [100.0, 0.0, 0], [101.0, 1.0, 0] ] };

var multilinestring = { "type": "MultiLineString", "coordinates": [ [ [100.0, 0.0, 0], [101.0, 1.0, 0] ], [ [102.0, 2.0, 0], [103.0, 3.0, 0] ] ] };

var multipolygon =  { "type": "MultiPolygon", "coordinates": [ [[[102.0, 2.0, 0], [103.0, 2.0, 0], [103.0, 3.0, 0], [102.0, 3.0, 0], [102.0, 2.0, 0]]], [[[100.0, 0.0, 0], [101.0, 0.0, 0], [101.0, 1.0, 0], [100.0, 1.0, 0], [100.0, 0.0, 0]], [[100.2, 0.2, 0], [100.8, 0.2, 0], [100.8, 0.8, 0], [100.2, 0.8, 0], [100.2, 0.2, 0]]] ] };

var feature =  { type: "Feature", properties: {}, geometry: { "type": "MultiPolygon", "coordinates": [ [[[102.0, 2.0, 0], [103.0, 2.0, 0], [103.0, 3.0, 0], [102.0, 3.0, 0], [102.0, 2.0, 0]]], [[[100.0, 0.0, 0], [101.0, 0.0, 0], [101.0, 1.0, 0], [100.0, 1.0, 0], [100.0, 0.0, 0]], [[100.2, 0.2, 0], [100.8, 0.2, 0], [100.8, 0.8, 0], [100.2, 0.8, 0], [100.2, 0.2, 0]]] ] } };


test('flatlands', function(t){
  t.plan(17);

  function isFlat(coords) {
    return coords.every(function(e) {
      return e.length === 2;
    });
  }

  var pointCoords = geojsonCoords(flatlands(point));
  t.equal(pointCoords.length, 1, 'Point is OK');
  t.ok(isFlat(pointCoords), 'Point is flat');

  var linestringCoords = geojsonCoords(flatlands(linestring));
  t.equal(linestringCoords.length, 2, 'LineString is OK');
  t.ok(isFlat(linestringCoords), 'LineString is flat');

  var polygonCoords = geojsonCoords(flatlands(polygon));
  t.equal(polygonCoords.length, 5, 'Polygon is OK');
  t.ok(isFlat(polygonCoords), 'Polygon is flat');

  var doughnutCoords = geojsonCoords(flatlands(doughnut));
  t.equal(doughnutCoords.length, 10, 'Doughnut is OK');
  t.ok(isFlat(doughnutCoords), 'Doughnut is flat');

  var multipointCoords = geojsonCoords(flatlands(multipoint));
  t.equal(multipointCoords.length, 2, 'MultiPoint is OK');
  t.ok(isFlat(multipointCoords), 'MultiPoint is flat');

  var multilinestringCoords = geojsonCoords(flatlands(multilinestring));
  t.equal(multilinestringCoords.length, 4, 'MultiLineString is OK');
  t.ok(isFlat(multilinestringCoords), 'MultiLineString is flat');

  var flatMultipolygon = flatlands(multipolygon);
  var multipolygonCoords = geojsonCoords(flatMultipolygon);
  t.equal(flatMultipolygon.coordinates.length, 2, 'MultiPolygon-structure is OK');
  t.equal(multipolygonCoords.length, 15, 'MultiPolygon is OK');
  t.ok(isFlat(multipolygonCoords), 'MultiPolygon is flat');

  var featureCoords = geojsonCoords(flatlands(feature));
  t.equal(featureCoords.length, 15, 'Feature is OK');
  t.ok(isFlat(featureCoords), 'Feature is flat');

});
