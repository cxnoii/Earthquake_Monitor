//declaring map outside of main
var map = L.map("map", {
    center:[28.63, 2.78],
    zoom:3
});


function main() {
    let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    d3.json(url).then(function (data) {
        console.log(data.features);
        drawCircles(data.features);
        createLegend();
    })
}

// this function takes data from API call and creates circle markers for each object in the json array
function drawCircles(eqData) {
    console.log('data passed into drawCircles', eqData)
    var earthquakes = [];

//looping through each object in array
    for (var i =0; i<eqData.length; i++) {
        var mag = eqData[i].properties.mag;
        var circleRadius = mag*10;
        var lat = eqData[i].geometry.coordinates[1];
        var lng = eqData[i].geometry.coordinates[0];
        var depth = eqData[i].geometry.coordinates[2];

        //creating circleMarkers for each object
        var circle = L.circleMarker([lat,lng], {
            radius: circleRadius,
        //color intensity returns a string of a color 
            color: colorIntensity(depth),
            fillOpacity: 0.6,
            opacity: 0.6
        }).bindPopup(`<h3>${eqData[i].properties.place}</h3><hr><p>Magnitude: ${mag}</p><p>Depth: ${depth}</p>`)

        earthquakes.push(circle)
    }
    // initializing a layer group for the array of circle markers and passing it into the createMap function
    createMap(L.layerGroup(earthquakes))
}

//the higher the depth, the deeper the color
function colorIntensity(depth) { 
    var color = ''
    if (depth >= 90) {
        color = 'firebrick'
    }
    else if (depth >= 70) { 
        color = 'orangered'
    }
    else if (depth >= 50) {
        color = 'orange'
    }
     else if (depth >= 30) {
        color = 'yellow'
     }
     else if (depth >= 10) {
        color = 'greenyellow'
     }
     else {
        color = 'lightgreen'
     }
     // returns a string which is used in the color parameter of circleMarker creation
     return color;
}

function createMap(earthquakes) {
    console.log('datapassed into createMap', earthquakes);

    //creating different views 
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var googleSat =  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    var stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    
    var topograph = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });


// earthquakes layer was made using data from an API call
// plate layer was madee from existing geoJSON formatted object in 'plate.JS' w/ geoJSON function
    var overlay = {
        "Earthquakes": earthquakes,
        "Tectonic Plates": L.geoJSON(plategeoJSON, {
            style: {color: 'red'}
        })
    };

//json object with all views
    var baseMaps = {
        "Street": street,
        "Street (Dark)": stadiaDark,
        "Satellite": googleSat,
        "Topograhic": topograph
      };

// adding a layer control panel
    L.control.layers(baseMaps, overlay, {
    collapsed: false
    }).addTo(map);

//mouse coordinate leaflet plug-in, see readme for credit
    L.control.mousePosition().addTo(map);

}

//legend leaflet plug-in, see readme for credit
function createLegend() { 
    var legendColors = ['lightgreen', 'greenyellow', 'yellow', 'orange', 'orangered', 'firebrick'];
    var scale = -10
    var legendRows = [];

    //creating an array for legends parameter in L.control.legend
    for (let i = 0; i<legendColors.length; i++) {
        let legendRow = {
            label: scale,
            type: "polygon",
            sides:4,
            fillColor: legendColors[i],
             weight: 2
        }
        legendRows.push(legendRow)
        scale += 20
           }

        //add legend to the map
        L.control.Legend({
            position: "bottomleft",
            title: "Depth (km)",
            opacity: 0.9,
            legends: legendRows
        }).addTo(map);
    }


main();
