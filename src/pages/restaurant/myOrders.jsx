import ComplexTable from "@/components/ComplexTable";
import { useQuery } from "@tanstack/react-query";
import { fetchSelfOrders } from "@/services/restaurantOrders";
import { useState } from "react";
import { itemSizes } from "@/components/restaurant/sizesEnum";
import { Table } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer, useEffect } from "react";
import { statuses } from "@/components/restaurant/StatusSelect";
import createSignalRConnection from "@/services/signalr";

export default function MyOrders() {
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const [apiOptions, setApiOptions] = useState({
    page: 0,
    pageSize: 12,
    searchKeyword: "",
  });
  const { data, isPending, refetch } = useQuery({
    queryKey: ["selfOrders", filterOptions],
    queryFn: () => fetchSelfOrders({ ...filterOptions }),
  });
  useEffect(() => {
    const connection = createSignalRConnection();
    connection.start();
    connection?.on("CRUD", (page, action) => {
      if (page == "Me.RestaurantOrders") {
        refetch();
      }
    });
  }, []);

  return (
    <ComplexTable
      tableTitle={t("myOrders")}
      loading={isPending}
      data={data?.data}
      hasAdd={false}
      hasFilter={false}
      hasStatusFilter={false}
      hasDownload={false}
      rowKey={(record) => record.id}
      columns={[
        { title: t("building"), dataIndex: ["room", "building", "name"] },
        { title: t("room"), dataIndex: ["room", "name"] },
        {
          title: t("orderFrom"),
          dataIndex: "createdAt",
          render: (value) => dayjs(value).format("YYYY/MM/DD - h:mm a") ?? "-",
        },
        {
          title: t("status"),
          dataIndex: "status",
          render: (value) => t(statuses[value]),
        },
        {
          title: t("notes"),
          dataIndex: "instructions",
          render: (value) => value ?? "-",
        },
      ]}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={[
              { title: t("name"), dataIndex: ["item", "name"], key: "name" },
              {
                title: t("size"),
                dataIndex: "itemSize",
                render: (value) => itemSizes[value],
              },
              { title: t("quantity"), dataIndex: "count" },
              {
                title: t("hasSugar"),
                dataIndex: "isAddSugar",
                render: (value) => (value ? t("yes") : t("no")),
              },
            ]}
            dataSource={record.items}
            pagination={false}
            rowKey={(record) => record.id}
          />
        ),
      }}
      paginationConfig={{
        total: data?.pagination.total,
        pageSize: data?.pagination.pageSize,
        current: data?.pagination.current,
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
      searchFunction={(e) =>
        dispatch({
          type: "search",
          payload: e.target.value,
        })
      }
    />
  );
}
