require(['esri/Map','esri/views/MapView','esri/layers/FeatureLayer','esri/widgets/Legend'],(Map,MapView,FeatureLayer,Legend)=>{ 
    const map = new Map({
        basemap: "streets",
       
    })   
    const view = new MapView({
        container:"viewDiv",
        map:map,
        zoom: 4, 
          center: [-100, 22] // Sets the center point of view with lon/lat
    })


    const countyPopupTemplate = {
        title:'State {STATE_NAME}<br>County {NAME}',
        content:[
            {
                title:'population by breakdown',
                type:'media',
                mediaInfos:[{
                    title:'By race',
                    type:'bar-chart',
                    value:{
                        fields:['WHITE','BLACK','AMERI_ES','ASIAN','HAWN_PI','OTHER','MULT_RACE','HISPANIC']
                    }
                },{
                    title:'By age',
                    type:'bar-chart',
                    value:{
                        fields:['AGE_UNDER5','AGE_5_17','AGE_18_21','AGE_22_29','AGE_30_39','AGE_40_49','AGE_50_64','AGE_65_UP']
                    }
                }]
            }
        ]
    }


    const lessOneHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#0000FF",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };
      const lessTwoHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#3F3FBF",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };
      const lessThreeHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#7F7F7F",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };
      const lessFourHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#BFBF3F",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };
      const lessFiveHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#FFFF00",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };
      const lessSixHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#FECC00",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };


    const lessSevenHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#FD9900",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };

      const lessEightHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#FC6600",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };

      const lessNineHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#FB3300",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };

      const greaterNineHundredThousand = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#FA0000",
        style: "solid",
        outline: {
          width: .5,
          color: [0, 0, 0, 255]
        }
      };
      const countyRenderer = {
        type: "class-breaks", // autocasts as new ClassBreaksRenderer()
        field: "POP2007",
        legendOptions: {
            title: "Population of US counties"
          },
        defaultSymbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "black",
          style: "backward-diagonal",
          outline: {
            width: .5,
            color: [0, 0, 0, 255]
          }
        },
        defaultLabel: "no data",
        classBreakInfos: [
          {
            minValue: 0,
            maxValue: 99999,
            symbol: lessOneHundredThousand,
            label: "< 100000"
          },
          {
            minValue: 100000,
            maxValue: 199999,
            symbol: lessTwoHundredThousand,
            label: "100000 - 199999"
          },
          {
            minValue: 200000,
            maxValue: 299999,
            symbol: lessThreeHundredThousand,
            label: "200000 - 299999"
          },
          {
            minValue: 300000,
            maxValue: 399999,
            symbol: lessFourHundredThousand,
            label: "300000 - 399999"
          },
          {
            minValue: 400000,
            maxValue: 499999,
            symbol: lessFiveHundredThousand,
            label: "400000 - 499999"
          },
          {
            minValue: 500000,
            maxValue: 599999,
            symbol: lessSixHundredThousand,
            label: "500000 - 599999"
          },
          {
            minValue: 600000,
            maxValue: 699999,
            symbol: lessSevenHundredThousand,
            label: "600000 - 699999"
          },
          {
            minValue: 700000,
            maxValue: 799999,
            symbol: lessEightHundredThousand,
            label: "700000 - 799999"
          }
          ,
          {
            minValue: 800000,
            maxValue: 899999,
            symbol: lessNineHundredThousand,
            label: "800000 - 899999"
          },
          {
            minValue: 900000,
            maxValue: 10000000,
            symbol: greaterNineHundredThousand,
            label: "> 900000"
          }
        ]
      };
   
      const mostPopulouseRaceRenderer = {
        type:'unique-value',
        valueExpression:`

          var white = $feature.WHITE;
          var black = $feature.BLACK;
          var ameri_es = $feature.AMERI_ES;
          var asian = $feature.ASIAN;
          var hawn_pi = $feature.HAWN_PI;
          var other = $feature.OTHER;
          var mult_race = $feature.MULT_RACE;
          var hispanic = $feature.HISPANIC;
          var races = [white,black,ameri_es,asian,hawn_pi,other,mult_race,hispanic];
          

          return Decode(Max(races),white,'White',black,'Black',ameri_es,'Ameri_es',asian,'Asian',hawn_pi,'Hawn_pi',other,'Other',mult_race,'Mult_race',hispanic,'Hispanic','n/a');



        `,
        valueExpressionTitle:
            "Counties by dominant race",
        uniqueValueInfos:[
          {
            value:'White',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#FFFFFF",
              style: "solid",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'White'
          },
          {
            value:'Black',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#000000",
              style: "solid",
              outline: {
                width: .5,
                color: [100, 100, 100, 255]
              }
            },
            label:'Black'
          },{
            value:'Ameri_es',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#00008B",
              style: "solid",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'Ameri_es'
          },{
            value:'Asian',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#00FF00",
              style: "solid",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'Asian'
          },{
            value:'Hawn_pi',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#FF0000",
              style: "solid",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'Hawian/Pacific Islander'
          },{
            value:'Other',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#808080",
              style: "solid",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'Other'
          },{
            value:'Mult_race',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#800080",
              style: "forward-diagonal",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'Multi Race'
          },{
            value:'Hispanic',
            symbol:{
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#964B00",
              style: "solid",
              outline: {
                width: .5,
                color: [0, 0, 0, 255]
              }
            },
            label:'Hispanic'
          }

        ]
      }

    const counties = new FeatureLayer({
        url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2',
        popupTemplate: countyPopupTemplate,
        renderer:mostPopulouseRaceRenderer
    })

    const states = new FeatureLayer({
        url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3'
    })
    map.add(counties)

   map.add(states)

    const legend = new Legend({
        view:view
    })

    view.ui.add(legend,'bottom-right')
   
      document.getElementById('changeRenderer').addEventListener('change',(event)=>{
     
      if(event.target.checked)
      {
        counties.renderer = mostPopulouseRaceRenderer;layerToggle
        document.getElementById('checkBoxText').innerText = 'View by population'
      }
      else
      {
        counties.renderer = countyRenderer;
        document.getElementById('checkBoxText').innerText = 'View by race'
      }
    })
    


})