const pip = require('robust-point-in-polygon');
const polys = require('./texture-polygons');

function getTexture(percentClay, percentSand) {
  const givenPoint = [percentSand, percentClay];
  let result = '';

  polys.forEach((t) => {
    if (pip(t.geom, givenPoint) < 1) {
      result = t.name;
    }
  });

  return result;
}

module.exports = getTexture;
