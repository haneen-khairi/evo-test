import StatusSelect from "@/components/restaurant/StatusSelect";
import { Table } from "antd";
import { t } from "i18next";
import { fetchAllOrders, updateOrder } from "@/services/restaurantOrders";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { itemSizes } from "@/components/restaurant/sizesEnum";
import { statuses } from "@/components/restaurant/StatusSelect";
import { Select } from "antd";
import createSignalRConnection from "@/services/signalr";
import NewOrderSound from "@/assets/audio/a1.mp3";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
export default function Orders() {
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const [status, setStatus] = useState("all");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["restaurantOrders", filterOptions, status],
    queryFn: () =>
      fetchAllOrders({
        ...filterOptions,
        status: status == "all" ? undefined : status,
      }),
  });
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection?.on("CRUD", (page, action) => {
      if (page == "RestaurantOrders") {
        refetch();
        if (action == "Create") {
          new Audio(NewOrderSound).play();
        }
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <StatusSelect
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      />
      <Table
        columns={[
          { title: t("name"), dataIndex: ["requester", "name"], key: "name" },

          { title: t("building"), dataIndex: ["room", "building", "name"] },
          { title: t("room"), dataIndex: ["room", "name"] },
          {
            title: t("orderFrom"),
            dataIndex: "createdAt",
            render: (value) =>
              dayjs(value).format("YYYY/MM/DD - h:mm a") ?? "-",
          },
          {
            title: t("notes"),
            dataIndex: "instructions",
            render: (value) => value ?? "-",
          },
          {
            title: t("actions"),
            dataIndex: "status",
            render: (value, row) => (
              <Select
                className="w-full"
                options={statuses.map((status, index) => ({
                  value: index,
                  label: t(status),
                }))}
                onChange={(value) =>
                  updateOrder({ id: row.id, status: value })
                    .then(refetch)
                    .then(() => setStatus(statuses.at(value)))
                }
                defaultValue={value}
              />
            ),
            width: 200,
          },
        ]}
        dataSource={data?.data}
        loading={isPending}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={[
                { title: t("name"), dataIndex: ["item", "name"] },
                { title: t("count"), dataIndex: "count" },
                {
                  title: t("size"),
                  dataIndex: "itemSize",
                  render: (value) => itemSizes[value],
                },
                {
                  title: t("hasSugar"),
                  dataIndex: "isAddSugar",
                  render: (value) => (value ? t("yes") : t("no")),
                },
              ]}
              dataSource={record.items}
              pagination={false}
            />
          ),
        }}
        pagination={{
          current: data?.pagination.current,
          pageSize: data?.pagination.pageSize,
          total: data?.pagination.total,
        }}
        onChange={(pagination, filters, sorter, { action }) => {
          if (action == "paginate") {
            dispatch({
              type: "paginate",
              payload: pagination,
            });
          }
          if (action == "sort") {
            dispatch({
              type: "sort",
              payload: sorter,
            });
          }
        }}
      ></Table>
    </div>
  );
}
