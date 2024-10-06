import { useTranslation } from "react-i18next";


function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>{t("ContactOus")}:</p> <p>oyvind.reitan3@gmail.com</p>
    </footer>
  )
}

export default Footer