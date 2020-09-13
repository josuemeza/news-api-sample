const express = require("express")
const cors = require("cors")
const { router } = require("./src/router")

const app = express()
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  const key = request.headers.key
  key && key === process.env.API_KEY
    ? next()
    : response.status(401).send("Unauthorized")
})

app.use(router)

exports.app = app