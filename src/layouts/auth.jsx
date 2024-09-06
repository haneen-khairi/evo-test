import { Flex } from "antd";
import "./auth.css";
import { Outlet } from "react-router-dom";
import LanguageDropdown from "../components/user/languageDropdown";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

export default function AuthLayout({ ...rest }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  return (
    <Flex
      style={{
        position: "relative",
      }}
      className="h-full"
    >
      <LanguageDropdown id="auth-button" />
      <Flex
        align="center"
        justify="space-between"
        className="w-full md:w-1/2"
        vertical
      >
        <div className="w-full flex items-center justify-center h-full">
          <Outlet />
        </div>
        <div
          style={{
            color: "#828282",
            position: "relative",
          }}
          className="my-3"
        >
          Powered by &nbsp;
          <a href="https://www.iknology.com/" target="_blank">
            Iknology
          </a>
          , version {import.meta.env.VITE_VERSION}
        </div>
      </Flex>
      <div
        id="auth-right"
        className="h-screen"
        style={{
          display: isMobile && "none",
        }}
      ></div>
    </Flex>
  );
}
