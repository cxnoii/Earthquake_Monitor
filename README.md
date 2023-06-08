# [Earthquake Monitor Application](https://cxnoii.github.io/Earthquake_Monitor/)

## Overview
The goal of this project is to make API calls from the USGS endpoints to create a map that will display earthquakes with a magnitude of 4.5 or higher within the past 7 days and describe their location, depth, and magnitude. Additionally, tectonic plate boundaries will be visualized as a leaflet layer that can be toggled on and off. The requests will be made using d3.json and the map visualization will be made using Leaflet.js. The tectonic plate boundaries will be displayed on the map by utilizing GeoJSON. Earthquake data is coming from the United States Geological Survey (USGS).

![eq_map](https://user-images.githubusercontent.com/114107454/224603182-510f94cb-c7c9-4f83-968b-8d3eeecf45c5.jpg)

## Data
The USGS API consists of many different parameters for each earthquake but the key metrics that will be used to make this application are as follows:
* _coordinates_
  - _0_: x-coordinate
  - _1_: y-coordinate
  - _2_: depth
* _mag_: size of the earthquake
* _title_: a description of where the earthquake occured

The radius of the circles drawn on the map indicate it's relative _magnitude_, while the _depth_ of the earthquake corresponds to the color of the circles. Values closer to green occured closer to the surface, increasing in depth as we approach red.

## Leaflet Libraries
Javascript's leaflet.js library was used in conjunction with OpenStreetMap's tile layers to create this application. After making requests to the USGS API, the parameters of interest are saved as variables where they will be passed into Leaflet's _circleMarker_ function to create a circle on the map with an earthquake's given coordinates. The following leaflet libraries are a sample of what was used in this project.

*  _L.tileLayer_
* _L.circleMarker_
* _.bindpopup_
* _L.geoJSON_
* _L.control.layers_
* _L.control.legend_




## Resources
* [USGS Earthquake Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
* [4.5+ Earthquakes in the Past 7 Days GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)
* [Tectonic Plate Boundaries from user: fraxen](https://github.com/fraxen/tectonicplates)
* [Tectonic Plate Boundaries GeoJSON](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

