import React from 'react'
import { Oval } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <Oval
      visible={true}
      height='100'
      width='100'
      color='#ffd256'
      secondaryColor='#ffd256'
      ariaLabel='oval-loading'
    />
  )
}

export default Spinner
