import ApplicationService from './app-service'

describe('ApplicationService', () => {
  it('should be truthy', () => {
    const aS = ApplicationService()
    expect(aS).toBeTruthy()
  })
})
