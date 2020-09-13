const express = require("express")
const cors = require("cors")
const { router } = require("./src/router")

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

exports.app = app