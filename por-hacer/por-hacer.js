const fs = require('fs')
const colors = require('colors')

let listadoPorHacer = []

const guardaDB = () => {
    let data = JSON.stringify(listadoPorHacer)
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Archivo no se pudo grabar')
    })
}

const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer)

    guardaDB()

    return porHacer
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json')
    } catch (err) {
        listadoPorHacer = []
    }
    //console.log(listadoPorHacer);
}

const getListado = () => {
    cargarDB()
    return listadoPorHacer
        /* let listado = require('../db/data.json')
        return listado */
}

const actualizar = (descripcion, completado = true) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardaDB()
        return true
    } else {
        return false
    }
}
const borrar = (descripcion) => {
        cargarDB()
        let nuevaLista = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
        if (listadoPorHacer.length === nuevaLista.length) {
            return false
        } else {
            listadoPorHacer = nuevaLista
            guardaDB()
            return true
        }
    }
    //mi version
    /* const borrar = (descripcion) => {
        cargarDB()
        let index = listadoPorHacer.findIndex(tarea => {
            return tarea.descripcion === descripcion
        })
        if (index >= 0) {
            listadoPorHacer.splice(index, index + 1)
            guardaDB()
            return true
        } else {
            return false
        }
    } */
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}