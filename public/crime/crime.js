require(["esri/Map", "esri/views/MapView", 'esri/layers/FeatureLayer','esri/widgets/Legend','esri/config'], function (Map, MapView,FeatureLayer,Legend,config) {
    let apiKey = window.location.hash.split('&')[0].substring(14)
   /* var oauth = new OAuthInfo({
        appId:'4fa2v8Shk6yJTjs8'
    })*/
   // IdentManager.registerOAuthInfos([oauth])
    //config.apiKey = apiKey
   config.apiKey = 'yO2rLoyamblscjedtGadUD-CYq07a-qjYZa6MgyD2_mwCjNIthtPuM6mkjeEa_H13Z8NKozPJz77cdPHx5pzW_ARimK0xKKX11HhJgS7XI5RptD6d05mSNP_731myUJge510B1tRdyvNvR45VVgaHg..'
   // let apiKey = 'yO2rLoyamblscjedtGadUD-CYq07a-qjYZa6MgyD2_mwCjNIthtPuM6mkjeEa_H13Z8NKozPJz77cdPHx5pzW_ARimK0xKKX11HhJgS7XI5RptD6d05mSNP_731myUJge510B1tRdyvNvR45VVgaHg..'
   // console.log(apiKey)


    const map = new Map({
        basemap: "streets"
    });
    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 11,
        center: [-84.5120, 39.1031]
    });


    const crimePopup = {
        title:'Crime popup',
        content:[
            {
                type:'fields',
                fieldInfos:[
                    {
                        fieldName:'CRMCYTOTC',
                        label:'Total Crime Index'
                    },{
                        fieldName:'CRMCYPERC',
                        label:'Personal Crime Index'
                    },{
                        fieldName:'CRMCYMURD',
                        label:'Murder Index'
                    },{
                        fieldName:'CRMCYRAPE',
                        label:'Rape Index'
                    },{
                        fieldName:'CRMCYROBB',
                        label:'Robbery Index'
                    },{
                        fieldName:'CRMCYASST',
                        label:'Assault Index'
                    },{
                        fieldName:'CRMCYPROC',
                        label:'Property Crime Index'
                    },{
                        fieldName:'CRMCYBURG',
                        label:'Burglary Index'
                    },{
                        fieldName:'CRMCYLARC',
                        label:'Larceny Index'
                    },{
                        fieldName:'CRMCYMVEH',
                        label:'Motor Vehicle Theft Index'
                    }
                ]
            }
        ]
      
    }

    const crimeLayer = new FeatureLayer({
       // apiKey,
        url:'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Crime/FeatureServer/0',
        popupTemplate:crimePopup,
        definitionExpression:"STATE_NAME = 'Ohio'"
    })

    const legend = new Legend({
        view
    })

    view.ui.add(legend,'bottom-left')

    map.add(crimeLayer)
});




