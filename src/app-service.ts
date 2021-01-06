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
    addCenterEventListener: AddCenterEventListener;
    addCenterStatus: AddCenterStatus;
  }
}
export interface AppServiceInstanceI {
  addMessageEventListener: AddMessageEventListener;
  addMessage: AddMessage;
  addCenterEventListener: AddCenterEventListener;
  addCenterStatus: AddCenterStatus;
}
export interface MessageEventListener {
  listener: any;
  id: number;
}
interface AddCenterEventListener {
  (listener: (center: number[])=> void, id: number): void
}
export interface Center {
  center: number[]
  id: number
}
interface AddCenterStatus {
  (center: number[], id: number) : void
}

const AppService: AppServiceI = () => {
  const messages$: Subject<Message> = new Subject()
  const centers$: Subject<Center> = new Subject()

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
  const addCenterEventListener: AddCenterEventListener = (listener, id) => {
    centers$.subscribe((center: Center) => {
      listener(center.center)
    },
    // eslint-disable-next-line no-console
    console.log,
    () => {
      // eslint-disable-next-line no-console
      console.log('Completed: ', id)
    })
  }
  const addCenterStatus: AddCenterStatus = (center, id) => {
    centers$.next({ center, id })
  }
  return {
    addMessageEventListener,
    addMessage,
    addCenterEventListener,
    addCenterStatus,
  }
}

export default AppService
