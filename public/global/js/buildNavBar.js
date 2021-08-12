
function buildNavBar() {

    var url = 'http://localhost:8080'

    const pages = [{
        "name": "Home",
        "path": url
    }, {
        "name": "3D map with layers",
        "path": url + "/layers"
    }, {
        "name": "Widgets",
        "path": url + "/widget"
    }, {
        "name": "FeatureFromGraphic",
        "path": url + "/featureFromGraphic"
    }, {
        "name": "MapFromCsv",
        "path": url + "/mapFromCsv"
    }, {
        "name": "census",
        "path": url + "/census"
    }, {
        "name": "USA",
        "path": url + "/usa"
    },
    {
        "name": "Sketch",
        "path": url + "/sketch"
    }
]


    var navbar = document.getElementById('navbar')
    pages.forEach(element => {
        let li = document.createElement('li')
        li.className = 'nav-item'
        let anchor = document.createElement('a')
        anchor.href = element.path
        anchor.innerHTML = element.name
        anchor.className = 'nav-link'
        li.appendChild(anchor)
        navbar.appendChild(li)
    });
}