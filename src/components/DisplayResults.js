import React, { useState } from 'react'

const DisplayResults = () => {
  const [xPos, setXPos] = useState(0)
  const openX = 0
  const closeX = -200
  return (
    <section data-id="display-results" style={{ left: xPos }}>
      <button
        type="button"
        onClick={() => {
          const newX = xPos === openX ? closeX : openX
          setXPos(newX)
        }}
      >
        {xPos === openX ? 'Close' : 'Open'}
      </button>
    </section>
  )
}

export default DisplayResults
