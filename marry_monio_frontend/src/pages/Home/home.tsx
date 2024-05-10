import React from 'react'
import { useParams } from 'react-router-dom'

function Home() {

    let {weddingId} = useParams()

  return (
    <>
        <div>home {weddingId}</div>
    </>
  )
}

export default Home