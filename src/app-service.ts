import { Subject } from 'rxjs'

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
    addZoomEventListener: AddZoomEventListener;
  }
}
export interface AppServiceInstanceI {
  addMessageEventListener: AddMessageEventListener;
  addMessage: AddMessage;
  addCenterEventListener: AddCenterEventListener;
  addCenterStatus: AddCenterStatus;
  addZoomEventLister: AddZoomEventListener;
}
interface AddCenterEventListener {
  (listener: (center: number[]) => void, id: number): void
}
export interface Center {
  center: number[]
  id: number
}
interface AddCenterStatus {
  (center: number[], id: number): void
}
interface Zoom {
  zoom: number
  id: number
}
interface AddZoomEventListener {
  (listener: (zoom: number) => void, id: number): void
}
interface AddZoom {
  (zoom: number, id: number): void
}
const isValid = (id: number, idB: number) => id !== idB
const AppService: AppServiceI = () => {
  const messages$: Subject<Message> = new Subject()
  const centers$: Subject<Center> = new Subject()
  const zooms$: Subject<Zoom> = new Subject()

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
    messages$.subscribe(...subArgs)
  }
  const addCenterEventListener: AddCenterEventListener = (listener, id) => {
    centers$.subscribe((center: Center) => {
      // do not send the center event to the caller
      if (center.id !== id) {
        listener(center.center)
      }
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
  const addZoomEventListener: AddZoomEventListener = (listener, id) => {
    zooms$.subscribe((zoom: Zoom) => {
      if (isValid(id, zoom.id)) {
        listener(zoom.zoom)
      }
    })
  }
  const addZoom: AddZoom = (zoom, id) => zooms$.next({ zoom, id })
  return {
    addMessageEventListener,
    addMessage,
    addCenterEventListener,
    addCenterStatus,
    addZoomEventListener,
    addZoom,
  }
}

export default AppService
