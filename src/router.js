const { Router } = require("express")
const router = Router()

const { newsRouter } = require("./services/news.service")
router.use("/news", newsRouter)

exports.router = router