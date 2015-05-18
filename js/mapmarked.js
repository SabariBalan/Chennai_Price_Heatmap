function myFunction() {
    var lat = document.getElementById("lat").value;
    var lon = document.getElementById("lon").value;

    var marker = L.marker([lat,lon], {

        draggable: false
    }).addTo(map)
        .on('click', function(e) {
            var layer = leafletPip.pointInLayer(this.getLatLng(), geojson, true);
            if (layer.length) {
                state.innerHTML = '<strong>' + layer[0].feature.properties.WARD_NO + '</strong>';
            } else {
                state.innerHTML = '';
            }
        });
    var lat = document.getElementById("lat").value;
    var lon = document.getElementById("lon").value;
    var layer = leafletPip.pointInLayer([lon,lat], geojson, true);
    if (layer.length) {
        state.innerHTML = '<strong>' + layer[0].feature.properties.WARD_NO + '</strong>';
    } else {
        state.innerHTML = 'Value Not Found';
    }
}