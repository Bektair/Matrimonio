import React from 'react'
import { useParams } from 'react-router-dom'
import { Counter } from '../../features/counter/counter'

function Home() {

    let {weddingId} = useParams()

  return (
    <>
        <div>home {weddingId}</div>
        <Counter></Counter>
    </>
  )
}

export default Home