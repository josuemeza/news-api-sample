const request = require('supertest')
const express = require('express')
const { when } = require("jest-when")
const { newsRouter, collection } = require("./news.service")

const { initFirestore } = require("../libs/firestore.lib")
const News = require("../model/news")
const { v4: uuidv4 } = require('uuid')

jest.mock("../libs/firestore.lib")
jest.mock("../model/news")
jest.mock("uuid")

const app = express()
app.use("/news", newsRouter)

beforeEach(() => {
  when(initFirebase)
    .calledWith()
    .mockReturnValue({
      collection: jest.fn()
    })
})

describe("GET /news", () => {
  it("return a list of news", () => {
    const data = [{
      "uuid": "uuid",
      "title": "title",
      "content": "content",
      "createdAt": "2020-09-13T22:10:08.958Z",
      "updatedAt": "2020-09-13T22:10:08.958Z"
    }]
    
    collection.get = jest.fn()
    when(collection.get)
      .calledWith()
      .mockReturnValue({
        docs: expected
      })
      
    request(app)
      .get('/news')
      .expect(200, done)
      .then( response => assert(response, expected) )
  })
})