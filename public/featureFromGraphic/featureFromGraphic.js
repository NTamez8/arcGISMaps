require(["esri/Map", "esri/views/MapView", 'esri/Graphic'], function (Map, MapView, Graphic) {
    const map = new Map({
        basemap: "streets"
    });
    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 4,
        center: [15, 65]
    });

   
    //view.graphics.add(graphic)

});