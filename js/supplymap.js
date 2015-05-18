 var southWest = L.latLng(12.816342, 79.940475),
            northEast = L.latLng(13.283909, 80.430053),
            bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('map_container',{
        center:[13.0827,80.2027],
        maxBounds: bounds,
        minZoom:11,
        maxZoom:15,
        zoom:11

    });
    map.fitBounds(bounds);


    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        subdomains:'1234'

    }).addTo(map);

    function getColor(d) {
        return d > 1000 ? '#ff00ff' :
                d > 500  ? '#BD0026' :
                        d > 200  ? '#E31A1C' :
                                d > 100  ? '#FC4E2A' :
                                        d > 50   ? '#FD8D3C' :
                                                d > 20   ? '#FEB24C' :
                                                        d > 10   ? '#FED976' :
                                                                '#FFEDA0';
    }
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.price),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }
    var geojson;
    // ... our listeners
   // geojson = L.geoJson(chennai);
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight

        });
    }

    geojson = L.geoJson(chennai, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Chennai Price Trends</h4>' +  (props ?
                '<b>' + props.WARD_NO + '</b><br />' + '<p>Rs.'+ props.price + ' per sq. ft.</p>'
                : 'Hover over a locality');
    };

    info.addTo(map);


    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
