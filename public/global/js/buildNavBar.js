
function buildNavBar() {
    const pages = [{
        "name": "Home",
        "path": "http://localhost:8080"
    }, {
        "name": "3D map with layers",
        "path": "http://localhost:8080/layers"
    }, {
        "name": "widgets",
        "path": "http://localhost:8080/widget"
    }, {
        "name": "featureFromGraphic",
        "path": "http://localhost:8080/featureFromGraphic"
    }, {
        "name": "mapFromCsv",
        "path": "http://localhost:8080/mapFromCsv"
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