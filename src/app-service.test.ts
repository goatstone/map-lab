import ApplicationService, { AppServiceInstanceI } from './app-service'

describe('ApplicationService', () => {
  it('should be truthy', () => {
    const appService: AppServiceInstanceI = ApplicationService()
    expect(appService).toBeTruthy()
  })
  it('should provide messages when they are added', done => {
    const expectedMessage = 'XXX'
    const appService: AppServiceInstanceI = ApplicationService()
    appService.addMessageEventListener(message => {
      expect(message).toBe(expectedMessage)
      done()
    }, 0)
    appService.addMessage(expectedMessage, 0)
  })
})
