module.exports = function flatlands (f) {
  var geometry;

  if (f.type === 'Feature'){
    geometry = f.geometry;
  } else {
    geometry = f;
  }

  function _flatlands(coords) {
    if (coords.length === 0) return coords;
    if (Array.isArray(coords[0])) {
      coords.forEach(function(e,i) {
        coords[i] = _flatlands(e);
      });
      return coords;
    }
    return coords.slice(0,2);
  }

  geometry.coordinates = _flatlands(geometry.coordinates);
  return f;
}
