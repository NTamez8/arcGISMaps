const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.get('/layers',(req,res)=>{
    res.sendFile(path.join(__dirname,'Pages/layers.html'))
})

app.get('/2dmap',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'index.html'))
})
app.get('/3dmap',(req,res)=>{
    res.end("3dmap")
})

app.get('/',(req,res)=>{
    res.redirect('/2dmap')
})
app.get('/widget',(req,res)=>{
    res.sendFile(path.join(__dirname,'Pages/widget.html'))
})

app.get('/featureFromGraphic',(req,res)=>{
    res.sendFile(path.join(__dirname,'Pages','featureFromGraphic.html'))
})

app.get('/mapFromCsv',(req,res)=>{
    res.sendFile(path.join(__dirname,'Pages','mapFromCsv.html'))
})





app.listen(8080,()=>console.log("listening on port 8080"))