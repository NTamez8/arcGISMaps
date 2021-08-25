require('dotenv').config()
const aws = require('aws-sdk')
const express = require('express')
const cors = require('cors')
const path = require('path')
const { exit } = require('process')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("public"))
app.set('view engine', 'pug')


let region = 'us-east-2'

aws.config = {
    region
}

const ec2 = new aws.EC2()

ec2.describeInstances({
    InstanceIds: ['i-070ea2b12fd035bff']
}, function (err, data) {

    var url =  'http://localhost:8080'
    if (err) {
        console.log(err)
        exit()
    } else if (process.env.NODE_ENV == 'test') {
        url =  'http://localhost:8080'

    } else {
        let temp = data.Reservations[0].Instances[0].PublicIpAddress
        temp = temp.split('.').join('-')
        url = `http://ec2-${temp}.${region}.compute.amazonaws.com`
    }


    app.get('/', (req, res) => {
        res.redirect('/2dmap')
    })

    app.get('/layers', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'layers'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/2dmap', (req, res) => {

        res.render(path.join(__dirname, 'index.pug'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })



    app.get('/widget', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'widget'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/featureFromGraphic', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'featureFromGraphic'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/mapFromCsv', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'mapFromCsv'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/census', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'census'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/usa', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'usa'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/sketch', (req, res) => {

        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'sketch'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })

    app.get('/crime', (req, res) => {
        res.render(path.join(__dirname, 'Pages', 'PugFiles', 'crime'), {
            url,
            "loadScript":`buildNavBar('${url}')`
        })
    })




    app.listen(8080, () => console.log("listening on port 8080"))


})
