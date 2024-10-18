import { useTranslation } from "react-i18next";


function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>{t("ContactOus")}:</p> <p>{t("ContactEmail")}</p>
    </footer>
  )
}

export default Footer