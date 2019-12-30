import { useState, useEffect } from 'react'

function useEngine() {
  const [isRunnningEngine, setEngine] = useState(false)
  const [tick, setTick] = useState(0)
  const maximumIntervals = 100
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
