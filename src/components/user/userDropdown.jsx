import { Flex, Avatar, Dropdown, Divider } from "antd";
import useTheme from "../../hooks/useTheme";
import CustomTypograhy from "../Typography";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slices/AuthSlice";
import { setTheme } from "@/slices/themeSlice";
import { t } from "i18next";
export default function UserDropdown(props) {
  const { token } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  return (
    <Dropdown
      menu={{
        items: [
          {
            label: t("profile"),
            onClick: () => {
              navigate("/profile");
            },
          },
          {
            label: <Divider style={{ margin: "2px" }} />,
          },
          {
            label: t("logout"),
            danger: true,
            onClick: () => {
              dispatch(logout());
              dispatch(setTheme("light"));
            },
          },
        ],
        style: {
          padding: "10px",
        },
      }}
    >
      <Flex gap={"middle"} align="center">
        <Avatar
          size={"large"}
          style={{
            border: "1px solid " + token.colorPrimary,
          }}
          src={user.picture}
        >
          {user.name[0]}
        </Avatar>
        <Flex vertical>
          <CustomTypograhy
            style={{
              color: "White",
            }}
          >
            {user.firstName}
          </CustomTypograhy>
          <CustomTypograhy
            style={{
              fontSize: "12px",
            }}
          >
            {user.jobTitle ?? "-"}
          </CustomTypograhy>
        </Flex>
        <IoIosArrowDown color="white" />
      </Flex>
    </Dropdown>
  );
}
