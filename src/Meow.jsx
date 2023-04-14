import React, { useState, useEffect } from 'react'

export default function Meow() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('https://api.opencagedata.com/geocode/v1/json').then((response) =>
      console.log(response)
    )
    // .then((data) => setData(data))
  }, [])

  return (
    <div>
      <h1>{data.query}</h1>
      <p>{data.city}</p>
      <p>{data.regionName}</p>
      <p>{data.country}</p>
    </div>
  )
}
