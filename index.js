const express = require('express')
const app = express()

const fs = require('fs')
const PORT = 8080

// import db from './db/productos.json'

app.get('/productos',(req,res)=>{
    fs.promises.readFile('./db/productos.json','utf8')
        .then(a=>res.send(a))

    
})
app.get('/productosRandom',(req,res)=>{
    fs.promises.readFile('./db/productos.json','utf8')
    .then(productos =>{
        const productosjson =JSON.parse(productos)
        const random = Math.floor(Math.random()* productosjson.length);
        // console.log(productosjson[random])
        res.send(productosjson[random])

    })
})



const server = app.listen(PORT,()=>{
    console.log(server.address().port)
})