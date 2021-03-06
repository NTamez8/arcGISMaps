require(['esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer', 'esri/widgets/Legend', 'esri/widgets/TimeSlider','esri/widgets/Slider'], (Map, MapView, CSVLayer, Legend, TimeSlider,Slider) => {

   

    url = window.location.href + 'newCrashDataCincinnati.csv'
    var currentYearQuery = 'YEAR >= 2012 AND YEAR <= 2013'
    var currentMonthQuery = 'MONTH = 6'


    const map = new Map({
        basemap: "streets",

    })

    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 11, // Sets the initial scale to 1:50,000,000
        center: [-84.5120, 39.1031] // Sets the center point of view with lon/lat
    })

    const complexRenderer = {
        type: 'unique-value',
        field: 'CRASHSEVERITYID',
        uniqueValueInfos: [{
            value: 1.0,
            label: 'FATAL INJURY',
            symbol: {
                type: 'simple-marker',
                color: 'red',
                size: 5
            }
        }, {
            value: 2.0,
            label: 'INJURY',
            symbol: {
                type: 'simple-marker',
                color: 'yellow',
                size: 5
            }
        }, {
            value: 3.0,
            label: 'PROPERTY DAMAGE ONLY (PDO)',
            symbol: {
                type: 'simple-marker',
                color: 'blue',
                size: 5
            }
        }, {
            value: 2.01905,
            label: 'PROPERTY DAMAGE ONLY',
            symbol: {
                type: 'simple-marker',
                color: 'green',
                size: 5
            }
        }
        , {
            value: 2.01903,
            label: 'MINOR INJURY SUSPECTED',
            symbol: {
                type: 'simple-marker',
                color: 'purple',
                size: 5
            }
        }, {
            value: 2.01904,
            label: 'INJURY POSSIBLE',
            symbol: {
                type: 'simple-marker',
                color: 'white',
                size: 5
            }
        }, {
            value: 2.01902,
            label: 'SERIOUS INJURY SUSPECTED',
            symbol: {
                type: 'simple-marker',
                color: '#FFCADA',
                size: 5
            }
        }
        , {
            value: 2.01901,
            label: 'FATAL',
            symbol: {
                type: 'simple-marker',
                color: 'black',
                size: 5
            }
        }
    
    ]
    }

    const simpleRenderer = {
        type: 'simple',
        symbol: {
            type: 'simple-marker',
            size: 6,
            color: 'blue',
            outline: null
        }
    }


    const csvLayer = new CSVLayer({
        url: url,

        renderer: complexRenderer,
        popupTemplate: {
            title: 'traffic crash data',
            content: [{
                type: 'fields',
                fieldInfos: [{
                        fieldName: "ADDRESS_X",
                        label: "Address"
                    },
                    {
                        fieldName: "CRASHSEVERITY",
                        label: "Crash Severity"
                    },
                    {
                        fieldName:'DATECRASHREPORTED',
                        label:'Crash Date'
                    }
                ]
            }]
        },
        delimiter: ',',
        definitionExpression: ""
    })


    const timeSlider = new TimeSlider({
        container: 'timeSlider',

        mode: 'time-window',
        fullTimeExtent: { // entire extent of the timeSlider
            start: new Date(2012, 0, 1),
            end: new Date(2019, 0, 1)
        },
        
    })
    timeSlider.stops = {
        interval: {
            value: 1,
            unit: 'years'
        }
    }

    timeSlider.watch('timeExtent', (value) => {
       
        startYear = value.start.getFullYear()
        endYear = value.end.getFullYear()
        startExpress = 'YEAR >= ' + startYear
        endExpress = 'YEAR <= ' + endYear
        currentYearQuery = startExpress + ' AND ' + endExpress
        csvLayer.definitionExpression = currentYearQuery + ' AND ' + currentMonthQuery
    })

    view.ui.add(timeSlider, 'bottom-left')

    const monthSlider = new Slider({
        container:'sliderDiv',
        min:1,
        max:12,
        steps: 1,
        values:[6],
        snapOnClickEnabled:true,
        visibleElements:{
            labels:true,
            rangeLabels:true
        },
        layout:'vertical',
        label:'Month'
        
    })

    monthSlider.on('thumb-drag',(event)=>{
        
        if(event.state == 'stop')
        {
            console.log(event)
            currentMonthQuery = 'MONTH = ' + event.value
            csvLayer.definitionExpression = currentYearQuery + ' AND ' + currentMonthQuery
            
        }
    })

    view.ui.add(monthSlider,'top-left')



    let legend = new Legend({
        view: view,
        layerInfos: [{
            layer: csvLayer,
            title: "Legend"
        }]
    })

    view.ui.add(legend, 'top-right')

    map.add(csvLayer)




})