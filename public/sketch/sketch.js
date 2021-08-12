require(["esri/Map", "esri/views/MapView", 'esri/widgets/Sketch', "esri/layers/GraphicsLayer", 'esri/layers/FeatureLayer',
    "esri/widgets/FeatureTable","esri/smartMapping/statistics/summaryStatistics","esri/widgets/Histogram",'esri/smartMapping/statistics/histogram'
], function (Map, MapView, Sketch, GraphicsLayer, FeatureLayer, FeatureTable,summaryStatistics,Histogram,histogram) {
    const map = new Map({
        basemap: "streets"
    });
    const view = new MapView({
        container: "viewDiv",
        map: map,
        scale: 69999,
        center: [-95.7129, 37.0902]
    });

    let censusPoints = new FeatureLayer({
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/0'
    })

    var myHistogram = new Histogram()

    

    let sketchLayer = new GraphicsLayer()
    map.add(censusPoints)
    map.add(sketchLayer)
    let sketch = new Sketch({
        layer: sketchLayer,
        view: view,
        creationMode: 'update',
        availableCreateTools: ['rectangle', 'polygon']
    })

    sketch.on('create', event => {
        if (event.state == 'complete') {

            if (sketchLayer.graphics.items.length > 1) {
                sketchLayer.remove(sketchLayer.graphics.items[0])
                document.getElementById('tableDiv').classList = []
                document.getElementById('tableDiv').innerHTML = null
            }

            queryCensusPoints(sketchLayer.graphics.items[0].geometry)
        }
    })

    sketch.on('delete', event => {
        document.getElementById('viewDiv').classList.remove('halfHight')
        document.getElementById('tableDiv').classList = []
        document.getElementById('tableDiv').innerHTML = null
        view.ui.remove(myHistogram)
    })


    function queryCensusPoints(geometry) {
       // console.log(geometry)
        const query = {
            spatialRelationship: 'intersects',
            geometry,
            outFields: ['POP2000', 'HOUSEHOLDS', 'HSE_UNITS'],
            returnGeometry: true
        }

        censusPoints.queryFeatures(query).then(result => {

            const layer = new FeatureLayer({
                source: result.features,
                objectIdField: 'OBJECTID',
                fields: [{
                    name: 'OBJECTID',
                    type: 'oid'
                }, {
                    name: 'POP2000',
                    type: 'integer'
                }, {
                    name: 'HOUSEHOLDS',
                    type: 'integer'
                }, {
                    name: 'HSE_UNITS',
                    type: 'double'
                }]
            })
/*
            summaryStatistics({
                layer,
                field:'POP2000',
                view,
                numBins:100
            }).then(stats=>{
                console.log(stats)
               
               
            }).catch(err=>{console.log(err)})*/
            histogram({
                layer,
                field:'POP2000',
                view,
                numBins:30
            }).then(result=>{
                console.log(result)
                view.ui.remove(myHistogram)
                myHistogram = Histogram.fromHistogramResult(result)
                
               
                view.ui.add(myHistogram,'top-left')
            }).catch(err=>{console.log(err)})
            const table = new FeatureTable({
                layer,
                visibleElements: {
                    selectionColumn: false
                },
                container: document.getElementById('tableDiv')
            })
            document.getElementById('viewDiv').classList.add('halfHight')
            document.getElementById('tableDiv').classList.add('halfHight')
        }).catch(err => {
            console.log(err)
        })



    }

    view.ui.add(sketch, 'top-right')
    //view.ui.add(myHistogram,'top-right')


});