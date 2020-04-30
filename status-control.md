# The Control Status Pattern

Often in client-side web development, the need arises in which distinct libraries with distinct event systems will have to be incorporated. Ideally, the application has a primary source of truth, while the other libraries follow the main application. 

Coordination of the various parts of an application involves functionality to control secondary applications, the reporting of the status of those secondary applications, and a way to reconcile status with what is controlled.

## The Control Status Pattern with React Hooks

In the case of React hooks, these tasks can be achieved with two custom React hooks. A **Status** state that represents the status of the application and **Control** state, that offers the ability to control secondary applications. Components are characterized by how they have access to the state. Components are either Control or Controlled components.

### Control components

* uses the control state to control

### Controlled / Secondary components

* controlled with the control state  
* report their status 
* do not have access to control methods.

 Reconciliation between what is being reported and the existing state of the application can be considered a side effect and reconciled with useEffect.

### Following is an example of using the custom hooks:

```
const initState = { center: [0, 0], zoom: 12 }
const statusReducer = ( state, action ) => {
  switch(action.type) {
    case 'center':  return Object.assign({}, state, { center: action.payload }}
  }}
const [ status, statusDispatcher ] = useReducer(statusReducer, initState)
const controlReducer = ( state, action ) => {
  switch (action.type) {
    case 'center' { return Object.assign({}, state, { center: action.payload })}
  }
}
const [ control, controlDispatcher ] = useReducer(controlReducer, initState)
```
### Reconcile the controler to the status
```
useEffect(() => {
	controlDispatcher({type: 'center',  payload: status.center})
}, [status.center])
```
### Component Usage
```
<ControlA
  controlDispatcher
/>
<ControlB
  controlDispatcher
/>
<MapA
  statusDispatcher
  control
/>
<MapB
  statusDispatcher
  control
/>
<Info
  status
/>
```

