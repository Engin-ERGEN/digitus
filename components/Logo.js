import React from 'react'
import { Image } from 'native-base'

const Logo = ({ props }) => {
  return (
    <Image {...props} resizeMode="contain" source={require('../public/images/logo.png')} alt="Logo"/>
  )
}

export default Logo