
var map = L.map("map", {
    center:[37.09, -95.71],
    zoom:5 
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.mousePosition().addTo(map);


let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

function main() {
    d3.json(url).then(function (data) {
        console.log(data.features);
        drawCircles(data.features);
    })
}


function drawCircles(eqData) {
    console.log('data passed into drawCircles', eqData)

    var earthquakes = [];

    for (var i =0; i<eqData.length; i++) {
        var mag = eqData[i].properties.mag;
        var circleRadius = mag**6.5;
        var lat = eqData[i].geometry.coordinates[1];
        var lng = eqData[i].geometry.coordinates[0];
        var depth = eqData[i].geometry.coordinates[2];

        var circle = L.circle([lat,lng], {
            radius:circleRadius,
            color: colorIntensity(depth),
            fillOpacity: 0.6,
            opacity: 0.6
        }).bindPopup(`<h3>${eqData[i].properties.place}</h3><hr><p>Magnitude: ${mag}</p><p>Depth: ${depth}</p>`)

        earthquakes.push(circle)
    }
    createMap(L.layerGroup(earthquakes))
}


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
     
     return color;
}

// //L.geoJSON objects must have a collection called 'coordinates': this is where coordinates to graph come from
// function createFeatures(eqData) { 
//     console.log('data passed into createFeatures', eqData);
//     var earthquakes = L.geoJSON(eqData, { 
//       onEachFeature: function (feature, layer) {
//                 layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
//         }
//     })
//     // createMap(earthquakes);
// }
  

function createMap(earthquakes) {
    console.log('datapassed into createMap', earthquakes);
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var googleSat =  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    var overlay = {
        Earthquakes: earthquakes
    }

    var baseMaps = {
        "Street Map": street,
        "Satellite": googleSat,
      };


    L.control.layers(baseMaps, overlay, {
    collapsed: false
    }).addTo(map);
}

main();
