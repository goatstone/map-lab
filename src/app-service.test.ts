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
  it('should provide center values when they are added with different ids', done => {
    const expectedCenter: number[] = [0, 0]
    const appService: AppServiceInstanceI = ApplicationService()
    appService.addCenterEventListener(centerValue => {
      expect(centerValue).toBe(expectedCenter)
      done()
    }, id)
    appService.addCenterStatus(expectedCenter, 10)
  })
  it('should provide center values to litener when values are added', done => {
    const expectedZoom: number = 12
    const applicationService: AppServiceInstanceI = ApplicationService()
    applicationService.addZoomEventListener(zoom => {
      expect(zoom).toBe(expectedZoom)
      done()
    }, 0)
    applicationService.addZoom(expectedZoom, 10)
  })
})
