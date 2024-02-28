import React from 'react'
import '../scss/main.scss'

const LobbyStatus = ({ host }: { host: string }) => {
  return (
    <div>
      <h3 className='host-player'>
        {host ? 'Host' : 'Waiting for host to start the game...'}
      </h3>
    </div>
  )
}

export default LobbyStatus
