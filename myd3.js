const texturePolygons = [{
  name: 'Heavy Clay',
  geom: [[0, 100], [40, 60], [0, 60]],
},
{
  name: 'Clay',
  geom: [[0, 60], [40, 60], [45, 55], [45, 40], [20, 40]],
},
{
  name: 'Silty Clay',
  geom: [[0, 60], [0, 40], [20, 40]],
},
{
  name: 'Sandy Clay',
  geom: [[45, 55], [45, 35], [65, 35]],
},
{
  name: 'Silty Clay Loam',
  geom: [[0, 40], [0, 28], [20, 28], [20, 40]],
},
{
  name: 'Clay Loam',
  geom: [[20, 40], [20, 28], [45, 28], [45, 40]],
},
{
  name: 'Sandy Clay Loam',
  geom: [[45, 35], [45, 28], [52, 20], [80, 20], [65, 35]],
},
{
  name: 'Silt',
  geom: [[0, 0], [0, 12], [8, 12], [19, 0]],
},
{
  name: 'Silt Loam',
  geom: [[0, 28], [0, 12], [8, 12], [19, 0], [50, 0], [25, 28]],
},
{
  name: 'Loam',
  geom: [[25, 28], [45, 5], [52, 5], [52, 20], [45, 28]],
},
{
  name: 'Sandy Loam',
  geom: [[52, 20], [52, 5], [45, 5], [50, 0], [70, 0], [85, 15], [80, 20]],
},
{
  name: 'Loamy Sand',
  geom: [[70, 0], [85, 15], [90, 10], [83, 0]],
},
{
  name: 'Sand',
  geom: [[90, 10], [83, 0], [100, 0]],
}];

var tempColor;

const width = 800;
const height = 800;
const lineThickness = 3;

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

const scaleX = d3.scale.linear()
  .domain([0, 100])
  .range([0, width ]);

const scaleY = d3.scale.linear()
  .domain([0, 100])
  .range([height, 0]);

const color = d3.scale.linear()
  .domain([0, 14])
  .range(['#d1d1d1', '#000000']);

const plot = svg.selectAll('polygon')
  .data(texturePolygons)
  .enter().append('g')
  .attr('class', 'node');

const polygons = plot.append('polygon')
  .attr('points', (d) => {
    return d.geom.map((da) => { return [scaleX(da[0]), scaleY(da[1])].join(','); }).join(' ');})
  .attr('stroke', 'white')
  .attr('stroke-width', lineThickness)
  .attr('fill', (d, i) => {
    return color(i);
  });

polygons.on('mouseover', function(d) {
  d3.select('#textname').text(d.name);
  tempColor = color(texturePolygons.map( p => p.name).indexOf(d.name));
  d3.select(this)
    .transition().duration(100)
    .style('opacity', 0.5)
    .style('fill', 'red');
});

polygons.on('mouseout', function(d)  {
  console.log(d)
  d3.select(this)
    .transition()
    .style('opacity', 1)
    .style('fill', tempColor);
});

plot.on('mousemove', ()=>{
  let sandSilt = d3.mouse(plot.node());
  let proportions = {};
  proportions.sand = (sandSilt[0] / width) * 100;
  proportions.clay = ((height - sandSilt[1]) / height) * 100;
  proportions.silt = 100 - (proportions.sand + proportions.clay);

  for (let [key, value] of Object.entries(proportions)) {
    if (value < 0) {
      value = 0;
    }
    value = value.toFixed(0);
    if (value < 10 ){
      value = '0' + value;
    }
    d3.select('#' + key).text(value + '% ' + key)
  }
});

const xAxis = d3.svg.axis()
  .scale(scaleX)
  .orient('bottom');

const yAxis = d3.svg.axis()
  .scale(scaleY)
  .orient('left');

svg.append('g')
  .attr('transform', 'translate(0,' + height +')')
  .attr('class', 'main axis date')
  .call(xAxis);

svg.append('g')
  .attr('transform', 'translate(100,0)')
  .attr('class', 'main axis date')
  .call(yAxis);

svg.append('text')
  .attr('class', 'x label')
  .attr('text-anchor', 'end')
  .attr('x', 50)
  .attr('y', height + 45)
  .text('% sand');

svg.append('text')
  .attr('class', 'y label')
  .attr('y', -40)
  .attr('x', -height-6)
  .attr('dy', '.75em')
  .attr('transform', 'rotate(-90)')
  .text('% clay');

svg.append('text')
  .attr('x', -625)
  .attr('y', 570)
  .attr('transform', 'rotate(-45)')
  .text('% silt');

// Polygon labels

let labels = plot.append('text')// should be centroid not average
  .attr('dx', (d) => {
    return scaleX(d.geom.map(
      g => g[0]).reduce(
      (total, score) => total + score) / d.geom.length) - 40;
  })
  .attr('dy', (d) =>{
    return scaleY(d.geom.map(g => g[1]).reduce((total, score) => total + score) / d.geom.length);
  })
  .text((d) => { return d.name });
