import React from 'react'
import InfoModule from './InfoModule'

export default function Info({ texts }) {
  return texts.map((text) => {
    return <InfoModule key={text.class} text={text} />
  })
}
