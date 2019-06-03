const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
//const config = require('./config/config')
//const mongoose = require('mongoose')

var path = require('path')


//var servestatic = require('serve-static')

const app = express()
//app.use(servestatic(__dirname + "/dist"))

// Specify Upload Folder
//app.use(express.static(path.join(__dirname, 'uploads')))
app.use('/uploads', express.static('uploads'));
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
require('./routes/routes')(app)
console.log("running")
app.listen(5000)
