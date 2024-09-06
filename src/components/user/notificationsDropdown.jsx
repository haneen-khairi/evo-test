import { GoBell } from "react-icons/go";
import { Dropdown, Flex, Typography, Modal, Badge } from "antd";
import HeaderButton from "../HeaderButton";
import useTheme from "../../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { fetchAllNotifications } from "@/services/notifications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import createSignalRConnection from "@/services/signalr";
import notificationSound from "@/assets/audio/a1.mp3";
import { t } from "i18next";
import NotificationItem from "./NotificationItem";
import { FaBell, FaRegBell } from "react-icons/fa";
export default function NotificationsDropdown(props) {
  const { token } = useTheme();
  const navigate = useNavigate();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchAllNotifications({ pageSize: 5, isRead: false }),
  });
  const [modalOptions, setModalOptions] = useState({
    visible: false,
    title: "",
    content: "",
  });
  useEffect(() => {
    let connection = createSignalRConnection();
    let audio = new Audio(notificationSound);
    connection.start();
    connection?.on("CRUD", (page, action) => {
      if (page == "Notifications" && action == "Create") {
        refetch();
        audio.play();
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);

  return (
    <>
      <Dropdown
        menu={{
          items: [
            ...(data?.data
              ? data?.data.map((item) => ({
                  label: (
                    <NotificationItem
                      item={item}
                      token={token}
                      refetch={refetch}
                      onClick={() => {
                        setModalOptions({
                          visible: true,
                          title: item.title,
                          content: item.body,
                        });
                      }}
                    />
                  ),
                }))
              : []),
            data?.data.length <= 0 && {
              label: (
                <Flex
                  justify="center"
                  style={{
                    maxWidth: "400px",
                    padding: "10px",
                    wordBreak: "break-word",
                    color: "#a9a9a9",
                  }}
                >
                  <span>{t("noNotifications")}</span>
                </Flex>
              ),
            },
            {
              label: (
                <Flex
                  justify="center"
                  style={{
                    maxWidth: "400px",
                    padding: "10px",
                    wordBreak: "break-word",
                    color: token.colorPrimary,
                  }}
                  onClick={() => {
                    navigate("/notifications");
                  }}
                >
                  <Typography className="font-semibold ">
                    {t("seeAll")}
                  </Typography>
                </Flex>
              ),
            },
          ],
        }}
      >
        <Badge count={data?.data?.length ?? 0}>
          <HeaderButton id="header-button" icon={<GoBell />} />
        </Badge>
      </Dropdown>
      <Modal
        open={modalOptions.visible}
        footer={null}
        onCancel={() => {
          setModalOptions({
            visible: false,
            title: "",
            content: "",
          });
        }}
      >
        <div className="w-full flex items-center justify-center">
          <FaRegBell size={100} />
        </div>
        <Typography className="mt-8 text-center font-semibold text-xl">
          {modalOptions.content}
        </Typography>
      </Modal>
    </>
  );
}
