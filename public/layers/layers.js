require(['esri/Map','esri/views/SceneView','esri/layers/TileLayer'],(Map,SceneView,TileLayer)=>{

const transportationLayer = new TileLayer({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
    id: "streets",
    opacity: 0.7
  });
  
  const housingLayer = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
    id: "ny-housing"
  });
 
    const map = new Map({
        basemap: "oceans",
        ground: "world-elevation",
        layers:[housingLayer]
    })
    map.layers.add(transportationLayer)
    const view = new SceneView({
        container:"viewDiv",
        map:map,
        scale: 50000000, // Sets the initial scale to 1:50,000,000
          center: [-101.17, 21.78] // Sets the center point of view with lon/lat
    })
    view.when(()=>{
        housingLayer.when(()=>{
            view.goTo(housingLayer.fullExtent)
        })
    })
    
  
    const layerToggle = document.getElementById("streetslayer")
    layerToggle.addEventListener("change",()=>{
        transportationLayer.visible = layerToggle.checked
    })

})