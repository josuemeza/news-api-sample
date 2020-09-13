require("dotenv").config({
  path: "./secrets/app.env",
})

const { app } = require("./index")

app.listen(process.env.PORT, () => {
  console.log("Serving function...")
  console.log("Function: app")
  console.log(`URL: http://localhost:${process.env.PORT}/`)
})