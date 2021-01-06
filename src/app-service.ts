import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Message {
  message: string;
  id: number | null;
}
interface AddMessageEventListener {
  (listener: (message: string) => void, id: number): void;
}
interface AddMessage {
  (message: string, id: number | null): void;
}
export interface AppServiceI {
  (): {
    addMessageEventListener: AddMessageEventListener;
    addMessage: AddMessage;
  }
}
export interface AppServiceInstanceI {
  addMessageEventListener: AddMessageEventListener;
  addMessage: AddMessage;
}
export interface MessageEventListener {
  listener: any;
  id: number;
}

const AppService: AppServiceI = () => {
  const messages$: Subject<Message> = new Subject()
  const mT = messages$.pipe(
    map(message => message),
  )
  const addMessage: AddMessage = (message, id) => {
    messages$.next({ message, id })
  }
  const addMessageEventListener: AddMessageEventListener = (listener, id) => {
    const subArgs = [
      (message: Message) => {
        listener(message.message)
      },
      // eslint-disable-next-line no-console
      console.log,
      () => { // eslint-disable-next-line no-console
        console.log('Completed: ', id)
      }]
    mT.subscribe(...subArgs)
  }

  return {
    addMessageEventListener,
    addMessage,
  }
}

export default AppService
