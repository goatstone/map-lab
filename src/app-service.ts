import { Subject, timer, zip } from 'rxjs'
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
  const delay = 1000
  const messages$: Subject<Message> = new Subject()
  const timer$ = timer(0, delay)
  const mT = zip(messages$, timer$).pipe(
    map(([message]) => message),
  )
  mT.subscribe(
    (message: Message) => {
      // eslint-disable-next-line no-console
      console.log('---- ', message)
      // sendToSubjects(messageEventListeners, message)
    },
    err => {
      // eslint-disable-next-line no-console
      console.log('Error: ', err)
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('Completed')
    },
  )
  const addMessage: AddMessage = (message, id) => {
    messages$.next({ message, id })
  }
  const addMessageEventListener: AddMessageEventListener = (listener, id) => {
    mT.subscribe((message: Message) => {
      // eslint-disable-next-line no-console
      console.log('---- ', id)
      listener(message.message)
    })
  }
  return {
    addMessageEventListener,
    addMessage,
  }
}

export default AppService
