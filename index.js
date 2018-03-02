const texts = [{
  name: 'Heavy Clay',
  geom: [[0, 100], [40, 60], [0, 60]],
},
{
  name: 'Clay',
  geom: [[0, 60], [40, 60], [45, 55], [45, 40], [20, 40]],
}];

function getTexture(percentSand, percentClay) {
  texts.forEach((t) => {
    console.log(t.name);
  });

  return '';
}

module.exports = getTexture;
