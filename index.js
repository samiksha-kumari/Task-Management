const express = require('express');
const routes = require('./config/routes')
const app = express()
const cors = require('cors')
const mongoose = require('./config/database')
const Role = require('./app/models/roles')
// const path = require('path')
const port = 3010;

const createRoles = async ()=>{
    const roles = await Role.find()
if(!roles || !roles.length){
await Role.create({name:'manager'})
await Role.create({name:'member'})
}}
createRoles()

app.use(cors())
app.use(express.json())
app.use('/', routes)
//one route setup
app.get('/', (req, res) => {
    res.send("Task Management App")
})

app.listen(port , () => {
    console.log("listening a port", port)
})


