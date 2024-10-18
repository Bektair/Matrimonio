import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Hooks/hooks";
import { selectWedding } from "../../redux/selectors/selectWeddingSlice";
import './home.sass';
import { selectLanguage } from "../../redux/selectors/selectLanguage";


export const Home = () => {
const wedding = useAppSelector(selectWedding);
const { t } = useTranslation();
const language = useAppSelector(selectLanguage).language






console.log("OK loading Home")

  return (
    <>
      <div className="wedding-main">
        <h1>{wedding?.title}</h1>
        <img src={wedding?.picture}/>
        { language == "IT" ? <></> : <label>{t("dresscode")} {wedding?.dresscode}</label>}
        <label>{wedding?.description}</label>
      </div>
    </>
  )
}

export default Home