const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.set('view engine','pug')

const url = 'http://localhost:8080'


app.get('/layers',(req,res)=>{
    //res.sendFile(path.join(__dirname,'Pages/layers.html'))
    res.render(path.join(__dirname,'Pages','PugFiles','layers'))
})

app.get('/2dmap',(req,res)=>{
    
    res.render(path.join(__dirname,'index.pug'))
})
app.get('/3dmap',(req,res)=>{
    //res.end("3dmap")
})

app.get('/',(req,res)=>{
    res.redirect('/2dmap')
})
app.get('/widget',(req,res)=>{
    //res.sendFile(path.join(__dirname,'Pages/widget.html'))
    res.render(path.join(__dirname,'Pages','PugFiles','widget'))
})

app.get('/featureFromGraphic',(req,res)=>{
    //res.sendFile(path.join(__dirname,'Pages','featureFromGraphic.html'))
    res.render(path.join(__dirname,'Pages','PugFiles','featureFromGraphic'))
})

app.get('/mapFromCsv',(req,res)=>{
   // res.sendFile(path.join(__dirname,'Pages','mapFromCsv.html'))
   res.render(path.join(__dirname,'Pages','PugFiles','mapFromCsv'))
})

app.get('/census',(req,res)=>{
    //res.sendFile(path.join(__dirname,'Pages','census.html'))
    res.render(path.join(__dirname,'Pages','PugFiles','census'))
})

app.get('/usa',(req,res)=>{
    //res.sendFile(path.join(__dirname,'Pages','census.html'))
    res.render(path.join(__dirname,'Pages','PugFiles','usa'))
})




app.listen(8080,()=>console.log("listening on port 8080"))