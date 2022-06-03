const fs = require('fs')

class Container {
    constructor(path){
        this.path=path
    }
    save(obj){
        obj.id = Date.now()

        fs.promises.readFile(this.path,'utf8')
        .then(userList=>{
            const userListJson = JSON.parse(userList)
            userListJson.push(obj)
            fs.promises.writeFile(this.path,JSON.stringify(userListJson,null,2))
                .then(e=>console.log(`Usuario agregado ,id: ${obj.id}`))
                .catch(err=>console.log('error: ',err))
        })
        .catch(err =>console.log(err))
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    }
    getById(id){
        fs.promises.readFile(this.path,'utf8')
        .then(userList=>{
            const userListJson = JSON.parse(userList)
            const user = userListJson.find(item=>item.name == id )
            if (user) {
                console.log(user)
            }else{
                console.log('El usuario no existe')
            }
        })
        .catch(err =>console.log(err))
        // Recibe un id y devuelve el objeto con ese id, o null si no está
    }
    getAll(){
        fs.promises.readFile(this.path,'utf8')
        .then(a=>console.log(a))
        .catch(err =>console.log(err))
        // Devuelve un array con los objetos presentes en el archivo.
    }
    deleteById(id){
        fs.promises.readFile(this.path,'utf8')
        .then(userList=>{
            const userListJson = JSON.parse(userList)
            const newUserList = userListJson.filter(item=>item.name !== id )
            fs.promises.writeFile(this.path,JSON.stringify(newUserList,null,2))
                .then(e=>console.log(`Usuario eliminado`))
                .catch(err=>console.log('error: ',err))
        })
        .catch(err =>console.log(err))
        // Elimina del archivo el objeto con el id buscado
    }
    deleteAll(){
        fs.promises.writeFile('./data.json','[]')
                .then(e=>console.log(`Todos los usuarios eliminados`))
                .catch(err=>console.log('error: ',err))
        // Elimina todos los objetos presentes en el archivo.
    }
}
const app = new Container('./../db/productos.json')

// app.getAll()
const producto= {
    titlea: "Globo Terráqueo",
    price: 345.67,
}
app.save(producto)
// app.getById('mateo')
// app.deleteById('gaspar')
// app.deleteAll()