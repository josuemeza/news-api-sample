const { when } = require("jest-when")
const { Router } = require("express")

jest.mock("express", () => ({ 
  Router: jest.fn()
}))

describe("Use service", () => {
  it("return inserted services", () => {
    const mockRouter = {
      route: jest.fn(),
      use: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    }
    process.env.GCP_DB_CREDENTIALS = "./secrets/credentials.json"
    when(mockRouter.route)
      .calledWith()
      .mockReturnValue(mockRouter)
    when(Router)
      .calledWith()
      .mockReturnValue(mockRouter)
    require("./router")
    expect(mockRouter.use.mock.calls.length).toBe(1)
  })
})