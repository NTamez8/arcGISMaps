require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"))
app.set('view engine','pug')

const url = process.env.NODE_ENV != 'test' ? '<Insert base path for site>': 'http://localhost:8080'

app.get('/',(req,res)=>{
    res.redirect('/2dmap')
})

app.get('/layers',(req,res)=>{

    res.render(path.join(__dirname,'Pages','PugFiles','layers'),{"url":`buildNavBar('${url}')`})
})

app.get('/2dmap',(req,res)=>{
    
    res.render(path.join(__dirname,'index.pug'),{"url":`buildNavBar('${url}')`})
})



app.get('/widget',(req,res)=>{
 
    res.render(path.join(__dirname,'Pages','PugFiles','widget'),{"url":`buildNavBar('${url}')`})
})

app.get('/featureFromGraphic',(req,res)=>{
   
    res.render(path.join(__dirname,'Pages','PugFiles','featureFromGraphic'),{"url":`buildNavBar('${url}')`})
})

app.get('/mapFromCsv',(req,res)=>{
  
   res.render(path.join(__dirname,'Pages','PugFiles','mapFromCsv'),{"url":`buildNavBar('${url}')`})
})

app.get('/census',(req,res)=>{
    
    res.render(path.join(__dirname,'Pages','PugFiles','census'),{"url":`buildNavBar('${url}')`})
})

app.get('/usa',(req,res)=>{
   
    res.render(path.join(__dirname,'Pages','PugFiles','usa'),{"url":`buildNavBar('${url}')`})
})

app.get('/sketch',(req,res)=>{
  
    res.render(path.join(__dirname,'Pages','PugFiles','sketch'),{"url":`buildNavBar('${url}')`})
})

app.get('/crime',(req,res)=>{
    res.render(path.join(__dirname,'Pages','PugFiles','crime'),{"url":`buildNavBar('${url}')`})
})




app.listen(8080,()=>console.log("listening on port 8080"))