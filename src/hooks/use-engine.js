import { useState, useEffect } from 'react'

function useEngine(maximumIntervals = 50) {
  const [isRunnningEngine, setEngine] = useState(false)
  const [tick, setTick] = useState(0)
  const intervalSeconds = 1000
  let interval = null
  useEffect(() => {
    if (isRunnningEngine) {
      interval = setInterval(() => {
        setTick(t => t + 1)
        if (tick > maximumIntervals) {
          // clearInterval is called in componentWillUnmount return call
          // ending the setInterval call
          setEngine(false)
          setTick(0)
        }
      }, intervalSeconds)
    }
    // equivalent of calling componentWillUnmount in a React Class component.
    return () => {
      clearInterval(interval)
      setTick(0)
    }
  }, [isRunnningEngine])

  return [isRunnningEngine, setEngine, tick]
}
export default useEngine
/*
  // engine
  const [isRunningEngine, setEngine, tick] = useEngine(mapStatus.center, mapStatus.viewPortRadius)
  useEffect(() => {
    const moveOffset = [0.001, 0.001]
    actions.setMoveCenterBy(moveOffset)
    actions.setMoveMarkerBy(moveOffset)
  }, [tick])

*/
