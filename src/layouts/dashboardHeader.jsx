import { Flex, Divider } from "antd";

import CustomTypography from "../components/Typography";
import HeaderButton from "../components/HeaderButton";
import NotificationsDropdown from "../components/user/notificationsDropdown";
import LanguageDropdown from "../components/user/languageDropdown";
import UserDropdown from "../components/user/userDropdown";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

//icons
import { MdOutlineWbSunny, MdLanguage } from "react-icons/md";

//images
import logo from "../assets/logo.png";
import header from "../assets/header.png";
//cookie
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../slices/themeSlice";
import MobileMenu from "../components/MobileMenu";
export default function DashboardHeader() {
  const { t } = useTranslation();
  let { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({
    query: "(max-width:600px)",
  });
  const dispatch = useDispatch();
  return (
    <Flex
      style={{
        width: "100%",
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        paddingBottom: "5vh",
      }}
      vertical
      id="container"
    >
      <Flex
        style={{
          width: "90%",
          margin: "3vh auto",
        }}
        vertical
        gap={40}
      >
        <Flex justify="space-between">
          <div id="logo">
            <Link to={"/"}>
              <img src={logo}></img>
            </Link>
          </div>
          <Flex
            gap={"large"}
            align="center"
            style={{
              backgroundCOl: "#F2F2F2",
            }}
          >
            <NotificationsDropdown />
            <HeaderButton
              onClick={(e) => {
                dispatch(toggleTheme());
              }}
              id="header-button"
              icon={<MdOutlineWbSunny />}
            />
            <LanguageDropdown />
            <div
              className="flex gap-2 items-center"
              style={{
                display: isMobile ? "none" : "flex",
              }}
            >
              <Divider
                style={{
                  borderInlineStart: "1px solid #282931",
                  height: "20px",
                }}
                type="vertical"
              />
              <UserDropdown />
            </div>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center" wrap="wrap">
          <div id="title">
            <CustomTypography
              fontSize={isMobile ? 20 : 40}
              style={{
                color: "white",
              }}
              className="text-3xl"
            >
              {t("welcome")} {user.firstName}
            </CustomTypography>
            <CustomTypography fontSize={24}>
              {t("happyWishing")}
            </CustomTypography>
          </div>
          {!isMobile && <NavigationBar />}
          {isMobile && <MobileMenu />}
        </Flex>
      </Flex>
    </Flex>
  );
}
