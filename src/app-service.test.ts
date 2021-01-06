import ApplicationService, { AppServiceInstanceI } from './app-service'

const id = 0
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
    }, id)
    appService.addMessage(expectedMessage, 0)
  })
  it('should provide center values when they are added', done => {
    const expectedCenter: number[] = [0, 0]
    const appService: AppServiceInstanceI = ApplicationService()
    appService.addCenterEventListener(centerValue => {
      expect(centerValue).toBe(expectedCenter)
      done()
    }, id)
    appService.addCenterStatus(expectedCenter, 0)
  })
})
