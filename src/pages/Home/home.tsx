import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/Hooks/hooks";
import { selectAuth } from "../../redux/selectors/selectAuth";
import { selectWedding } from "../../redux/selectors/selectWeddingSlice";
import { selectWeddings } from "../../redux/selectors/selectWeddingsSlice";
import './home.sass';


export const Home = () => {
const wedding = useAppSelector(selectWedding);
const { t } = useTranslation();
const weddings = useAppSelector(selectWeddings)
const { dbId } = useSelector(selectAuth);



useEffect(()=>{

}, [weddings, dbId])



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