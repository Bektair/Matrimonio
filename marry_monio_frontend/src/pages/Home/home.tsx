import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

function Home() {

    let {weddingId} = useParams()

console.log("OK loading Home")

  return (
        <div>home {weddingId}</div>
  )
}

export default Home