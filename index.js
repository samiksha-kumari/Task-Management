const express = require('express');

const app = express()
const path = require('path')
const port = 3010;

app.listen(port , () => {
    console.log("listening a port", port)
})


