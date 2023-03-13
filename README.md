# Earthquake Monitor Application

## Overview
The goal of this project is to make API calls from the USGS endpoints to create a map that will display earthquakes with a magnitude of 4.5 or higher within the past 7 days and describe their location, depth, and magnitude. Additionally, tectonic plate boundaries will be visualized as a leaflet layer that can be toggled on and off. The requests will be made using d3.json and the map visualization will be made using Leaflet.js. The tectonic plate boundaries will be displayed on the map by utilizing GeoJSON. Earthquake data is coming from the United States Geological Survey (USGS).

## Resources
* [USGS Earthquake Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
* [4.5+ Earthquakes in the Past 7 Days GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)
* [Tectonic Plate Boundaries from user: fraxen](https://github.com/fraxen/tectonicplates)
* [Tectonic Plate Boundaries GeoJSON](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)


![Uploading eq_map.jpg…]()
