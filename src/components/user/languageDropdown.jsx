import { MdLanguage } from "react-icons/md";
import { Dropdown } from "antd";
import HeaderButton from "../HeaderButton";
import { useTranslation } from "react-i18next";
import usaFlag from "@/assets/usa_flag.svg";
import ksaFlag from "@/assets/ksa_flag.svg";
export default function LanguageDropdown({
  shape = "circle",
  id = "header-button",
}) {
  const { i18n } = useTranslation();
  return (
    <Dropdown
      placement="bottomLeft"
      menu={{
        items: [
          {
            label: <img src={usaFlag} width={"20px"} height={"20px"} />,
            key: "en",
          },
          {
            label: <img src={ksaFlag} width={"20px"} height={"20px"} />,
            key: "ar",
          },
        ],
        onClick: ({ key }) => {
          i18n.changeLanguage(key);
          localStorage.setItem("lang", key);
        },
      }}
    >
      <HeaderButton shape={shape} id={id} icon={<MdLanguage />} />
    </Dropdown>
  );
}
