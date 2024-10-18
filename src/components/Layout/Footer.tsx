import { useEffect } from "react";
import { useTranslation } from "react-i18next";


function Footer() {
  const { t } = useTranslation();

  useEffect(()=>{
    console.log("------------------Contact: " + t("contactOus"))
  }, [])
  
  return (
    <footer>
      <p>{t("contactOus")}:</p> <p>{t("contactEmail")}</p>
    </footer>
  )
}

export default Footer