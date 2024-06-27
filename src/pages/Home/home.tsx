import { useAppSelector } from "../../redux/Hooks/hooks";
import { selectWedding } from "../../redux/selectors/selectWeddingSlice"
import './home.sass'


export const Home = () => {
const wedding = useAppSelector(selectWedding);

console.log("OK loading Home")

  return (
    <>
      <div className="wedding-main">
        <h2>{wedding?.title}</h2>
        <img src={wedding?.picture}/>
        <label>DressCode: {wedding?.dresscode}</label>
        <label>{wedding?.description}</label>
      </div>


    </>
  )
}

export default Home