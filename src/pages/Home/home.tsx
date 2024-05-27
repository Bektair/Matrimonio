import { useParams } from 'react-router-dom'

export const Home = () => {

    let {weddingId} = useParams()

console.log("OK loading Home")

  return (
        <div>home {weddingId}</div>
  )
}

export default Home