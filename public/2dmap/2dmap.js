require(['esri/Map','esri/views/MapView'],(Map,MapView)=>{


 
    const map = new Map({
        basemap: "oceans",
       
    })
   
    const view = new MapView({
        container:"viewDiv",
        map:map,
        scale: 50000000, // Sets the initial scale to 1:50,000,000
          center: [-101.17, 21.78] // Sets the center point of view with lon/lat
    })
  
  
 

})