import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Hooks/hooks";
import { selectWedding } from "../../redux/selectors/selectWeddingSlice"
import './home.sass'


export const Home = () => {
const wedding = useAppSelector(selectWedding);
const { i18n, t } = useTranslation();

console.log("OK loading Home")

  return (
    <>
      <div className="wedding-main">
        <h2>{wedding?.title}</h2>
        <img src={wedding?.picture}/>
        <label>{t("dresscode")} {wedding?.dresscode}</label>
        <label>{wedding?.description}</label>
      </div>


    </>
  )
}

export default Home