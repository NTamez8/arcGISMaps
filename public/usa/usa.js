require(["esri/Map", "esri/views/MapView", 'esri/layers/FeatureLayer','esri/widgets/Legend'], function (Map, MapView,FeatureLayer,Legend) {
    const map = new Map({
        basemap: "topo"
    });
    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [-95.7129, 37.0902]
    });


    const statePopupTemplate = {
        title:"State",
        content:[
            {
                type:'fields',
                fieldInfos:[
                    {
                        fieldName:'state_name',
                        label:'State name'
                    },
                    {
                        fieldName:'pop2000',
                        label:'Population'
                    },
                    {
                        fieldName:'ss6.gdb.States.area',
                        label:'Area'
                    }
                ]
            }
        ]
    }

    const states = new FeatureLayer({
        url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2',
        popupTemplate: statePopupTemplate,
    })

    citiesHeatmap = {
        type:'heatmap',
        field:'pop2000',
        blurRadius:10,
        colorStops: [
            { ratio: 0, color: "rgba(255, 140, 0, 0)" },
            { ratio: 0.1, color: "rgba(255, 140, 0, 255)" },
            { ratio: 0.2, color: "#FA6F01" },
            { ratio: 0.4, color: "#F55301" },
            { ratio: 0.6, color: "#F03801" },
            { ratio: 0.8, color: "#EB1C01" },
            { ratio: 1, color: "#E60001" }
          ],
          maxPixelIntensity: 7282000,
          minPixelIntensity: 0
        
    }

    const cities = new FeatureLayer({
        url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
        renderer:citiesHeatmap,
        title:'USA population heatmap'
    })

    const highways = new FeatureLayer({
        url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/1'
    })

    map.add(states)
    map.add(cities)
    map.add(highways)

    const legend = new Legend({
        view:view
    })

    view.ui.add(legend,'bottom-right')
});