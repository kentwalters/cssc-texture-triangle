# cssc-texture-triangle

Basically this:
 
![texture triangle](https://raw.githubusercontent.com/kentwalters/cssc-texture-triangle/master/text_tri.gif)

but in javascript.

Each soil texture is considered a polygon, represented by an array of coordinates of the vertexes.

```getTexture()``` takes a relative proportion of sand and silt, and returns the soil texture name based on which polygon the point is contained by. 

Uses [mikolalysenko/robust-point-in-polygon](https://github.com/mikolalysenko/robust-point-in-polygon).
 