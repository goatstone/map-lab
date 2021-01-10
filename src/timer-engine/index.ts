
interface TimerEngine {
  (): TimerEngineInstance
}
interface OnMessage {
  (listener: (message: string) => void): void
}
export interface TimerEngineInstance {
  add: (message: string) => void
  onMessage: OnMessage
}
const timerEngine: TimerEngine = () => {
  const messages: string[] = []
  let intervalHandle: any
  let isRunning: boolean = false
  const increment = 1000
  let singleListener: (message: string) => void
  const run = () => {
    if (isRunning) return
    isRunning = true
    intervalHandle = setInterval(() => {
      const message = messages.pop()
      if (!message) {
        isRunning = false
        clearInterval(intervalHandle)
      } else if (singleListener) {
        singleListener(message)
      }
      // else {
      //   // listener(message)
      //   if (singleListener) {
      //     singleListener(message)
      //   }
      // }
    }, increment)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let singleListener
  const onMessage: OnMessage = msgListner => {
    singleListener = msgListner
    console.log('mes', msgListner)
  }
  const add = (message: string) => {
    if (!isRunning) {
      run()
    }
    messages.unshift(message)
  }
  return {
    add,
    onMessage,
  }
}

export default timerEngine
