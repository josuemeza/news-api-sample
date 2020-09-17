const { Router } = require("express")
const { firestore } = require("../libs/firestore.lib")
const News = require("../model/news")
const { v4: uuidv4 } = require('uuid')

const collection = firestore.collection("news")
const newsRouter = Router()

newsRouter.route("/")
  .get(async (_request, response) => {
    const newsList = await collection.get().docs
      .map( doc => new News(doc.data()) )
    response.json(newsList)
  })
  .post(async (request, response) => {
    const data = {
      uuid: uuidv4(),
      ...request.body
    }
    const news = new News(data)
    const json = news.json()
    await collection
      .doc(news.uuid)
      .set(json)
    response.status(201).json(json)
  })

newsRouter.route("/:uuid")
  .get(async (request, response) => {
    const current = await collection
      .doc(request.params.uuid)
      .get()
    const news = new News(current.data())
    response.json(news)
  })
  .put(async (request, response) => {
    const doc = collection
      .doc(request.params.uuid)
    const current = await doc.get()
    const data = {
      ...current.data(),
      ...request.body
    }
    const news = new News(data)
    news.updatedAt = new Date()
    const json = news.json()
    await doc.set(json)
    response.json(json)
  })
  .delete(async (request, response) => {
    await collection
      .doc(request.params.uuid)
      .delete()
    response.json({ message: "deleted" })
  })

exports.newsRouter = newsRouter
exports.collection = collection