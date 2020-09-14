const { Router } = require("express")
const { firestore } = require("../libs/firestore.lib")
const News = require("../model/news")
const { v4: uuidv4 } = require('uuid')

const collectionId = "news"
const newsRouter = Router()

newsRouter.route("/")
  .get(async (_request, response) => {
    const collection = await firestore
      .collection(collectionId)
      .get()
    const newsList = collection.docs
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
    await firestore
      .collection(collectionId)
      .doc(news.uuid)
      .set(json)
    response.status(201).json(json)
  })

newsRouter.route("/:uuid")
  .get(async (request, response) => {
    const uuid = request.params.uuid
    const doc = await firestore
      .collection(collectionId)
      .doc(uuid)
      .get()
    const news = new News(doc.data())
    response.json(news)
  })
  .put(async (request, response) => {
    const data = {
      uuid: request.params.uuid,
      ...request.body
    }
    const news = new News(data)
    news.updatedAt = new Date()
    const json = news.json()
    await firestore
      .collection(collectionId)
      .doc(news.uuid)
      .set(json)
    response.json(json)
  })
  .delete(async (request, response) => {
    const uuid = request.params.uuid
    await firestore
      .collection(collectionId)
      .doc(uuid)
      .delete()
    response.json({ message: "deleted" })
  })

exports.newsRouter = newsRouter