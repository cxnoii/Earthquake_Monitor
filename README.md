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

## Leaflet Plug-ins
Javascript's leaflet.js library was used in conjunction with OpenStreetMap's tile layers to create this application. After making requests to the USGS API, the parameters of interest are saved as variables where they will be used in leaflet functions to create decorate the map. The following leaflet libraries are a sample of what was used in this project.

*  _L.tileLayer_
  - tileLayers from OpenStreetMap were used to draw the global map.
* _L.circleMarker_
  - The coordinates of the earthquakes were passed into this leaflet function to draw a circle around the epicenter of the earthquake. Circle size is directly related to the magnitude of the earthquake. The circles can be clicked to view the value of magnitude and depth.
* _.bindpopup_
  - The values for magnitude and depth are displayed in a text box upon clicking through the use of this function.
* _L.control.layers_
  - Enables user to switch the map style and toggle the earthquake markers as well as the tectonic plate boundaries
* _L.control.legend_
  - Draws a legend on the map indicating the earthquakes relative depth. 
* L.geoJSON
  - Used to draw the tectonic plate boundaries using geoJSON data provided by user: [fraxen](https://github.com/fraxen/tectonicplates)

## Resources
* [USGS Earthquake Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
* [4.5+ Earthquakes in the Past 7 Days GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)
* [Tectonic Plate Boundaries from user: fraxen](https://github.com/fraxen/tectonicplates)
* [Tectonic Plate Boundaries GeoJSON](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

