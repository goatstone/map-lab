import React, { useState, useEffect } from 'react'

console.log(React)
function cHook() {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    // function handleStatusChange(status) {
    setIsOnline(true)
    // }

    //   ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    //   return () => {
    //     ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    //   };
  })

  return isOnline
}

export default cHook
