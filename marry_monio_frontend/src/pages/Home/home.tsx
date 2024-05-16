import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

function Home() {

    let {weddingId} = useParams()

console.log("OK loading Home")

  return (
    // <Layout>
        <div>home {weddingId}</div>
    // </Layout>
  )
}

export default Home