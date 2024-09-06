import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import StatusComponent from "@/components/statusComponent";
import ActionButton from "../actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllBuildings,
  deleteBuilding,
  updateBuilding,
} from "@/services/buildings";
import serializeAndDownload from "@/utils/exportCSV";
import useResultModal from "@/hooks/useResultModal";
export default function BuildingsComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const globalModal = useResultModal();
  const {
    data: buildings,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["buildings", filterOptions],
    queryFn: () => fetchAllBuildings(filterOptions),
  });
  return (
    <div className="w-full">
      <ComplexTable
        tableTitle={t("buildings")}
        addText={t("addBuilding")}
        addFunction={() => {
          navigate("/create-building");
        }}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            sorter: true,
          },
          {
            title: t("roomsNo"),
            dataIndex: "roomsCount",
            key: "roomsNo",
            sorter: true,
          },
          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            render: (value) => {
              return <StatusComponent text={value} />;
            },
            sorter: true,
          },
          {
            title: t("action"),
            dataIndex: "actions",

            key: "actions",
            render: (value, record) => (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: t("edit"),
                      onClick: () => {
                        navigate(`/edit-building/${record.id}`);
                      },
                    },
                    {
                      key: "status",
                      label: record.isActive ? t("deactivate") : t("activate"),
                      onClick: () => {
                        updateBuilding({
                          id: record.id,
                          isActive: !record.isActive,
                        })
                          .then(() => {
                            refetch();
                          })
                          .catch((e) => {
                            globalModal.error(e.message, t("error"));
                          });
                      },
                    },
                    {
                      key: "delete",
                      label: t("delete"),
                      danger: true,
                      onClick: () => {
                        globalModal
                          .confirm({
                            title: t("areYouSure"),
                            subtitle: t("deleteBuilding"),
                          })
                          .then(async (e) => {
                            await deleteBuilding(record.id);
                            refetch();
                          });
                      },
                    },
                  ],
                }}
              >
                <ActionButton>
                  <BiDotsVertical className="align-middle" size={20} />
                </ActionButton>
              </Dropdown>
            ),
          },
        ]}
        data={buildings?.data}
        loading={isPending}
        paginationConfig={{
          current: buildings?.pagination.current,
          pageSize: buildings?.pagination.pageSize,
          total: buildings?.pagination.total,
        }}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          if (action === "paginate") {
            dispatch({ type: "paginate", payload: pagination });
          }
          if (action === "sort") {
            dispatch({ type: "sort", payload: sorter });
          }
        }}
        downloadFunction={() => {
          serializeAndDownload(
            buildings?.data.map((building) => ({
              [t("name")]: building.name,
              [t("roomsNo")]: building.roomsCount,
              [t("status")]: building.status,
            })),
            "buildings"
          );
        }}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inActive"), value: false },
        ]}
        statusFilter={(e) => {
          dispatch({ type: "status", payload: e });
        }}
      />
    </div>
  );
}
