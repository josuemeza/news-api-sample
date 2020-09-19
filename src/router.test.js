const { when } = require("jest-when")
const { Router } = require("express")

jest.mock("express")

describe("Use service", () => {
  it("return inserted services", () => {
    const mockRouter = {
      use: jest.fn()
    }
    process.env.GCP_DB_CREDENTIALS = "./secrets/credentials.json"
    when(Router)
      .calledWith()
      .mockReturnValue(mockRouter)
    require("./router")
    expect(mockRouter.use.mock.calls.length).toBe(1)
  })
})