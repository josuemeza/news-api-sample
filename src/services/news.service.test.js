const request = require('supertest')
const express = require('express')
const { when } = require("jest-when")
const { newsRouter, collection } = require("./news.service")

jest.mock("../libs/firestore.lib", () => ({
  initFirestore: jest.fn().mockReturnValue({
    collection: () => ({
      get: jest.fn(),
      doc: jest.fn()
    })
  })
}))

const app = express()
app.use(express.json())
app.use("/news", newsRouter)

const sample = {
  "uuid": "uuid",
  "title": "title",
  "content": "content",
  "createdAt": "2020-09-13T22:10:08.958Z",
  "updatedAt": "2020-09-13T22:10:08.958Z"
}

describe("GET /news", () => {
  it("return a list of news", (done) => {
    when(collection.get)
      .calledWith()
      .mockReturnValue({
        docs: [ { data: () => sample } ]
      })
    request(app)
      .get('/news')
      .expect(200, [ sample ], done)
  })
})

describe("GET /news/uuid", () => {
  it("returns a single news", (done) => {
    when(collection.doc)
      .calledWith("uuid")
      .mockReturnValue({
        get: () => ({ data: () => sample })
      })
    request(app)
      .get('/news/uuid')
      .expect(200, sample, done)
  })
})

describe("POST /news", () => {
  it("return a created news", (done) => {
    const newUuid = "new-uuid"
    const body = {
      title: "new title",
      content: "new content"
    }
    when(collection.doc)
      .calledWith(expect.anything())
      .mockReturnValue({
        set: (json) => json 
      })
    request(app)
      .post("/news")
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((error, response) => {
        if(error) done(error)
        const json = JSON.parse(response.text)
        const { title, content } = json
        expect({ title, content }).toEqual(body)
        done()
      })
  })
})

describe("PUT /news/uuid", () => {
  it("returns updated news", (done) => {
    const uuid = "uuid"
    const body = {
      content: "new content"
    }
    const expected = {
      title: sample.title,
      content: body.content
    }
    when(collection.doc)
      .calledWith(expect.anything())
      .mockReturnValue({
        get: () => ({ data: () => sample }),
        set: (json) => json 
      })
    request(app)
      .put("/news/" + uuid)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, response) => {
        if(error) done(error)
        const json = JSON.parse(response.text)
        const { title, content } = json
        expect({ title, content }).toEqual(expected)
        done()
      })
  })
})

describe("DELETE /news/uuid", () => {
  it("return deleted message", (done) => {
    const expected = { message: "deleted" }
    when(collection.doc)
      .calledWith(expect.anything())
      .mockReturnValue({
        delete: () => true 
      })
    request(app)
      .delete("/news/uuid")
      .expect(200, expected, done)
  })
})