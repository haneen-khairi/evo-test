import { Pagination } from "antd";
import TableTopbar from "@/components/TableTopbar";
import { t } from "i18next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllItems,
  updateItem,
  deleteItem,
} from "../../services/restaurantItems";
import FullImageCard from "@/components/restaurant/FullImageItemCard";
import { useNavigate } from "react-router-dom";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import useResultModal from "@/hooks/useResultModal";
export default function Products() {
  const { confirm } = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const navigate = useNavigate();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["restaurantProducts", filterOptions],
    queryFn: () => fetchAllItems({ ...filterOptions }),
  });

  return (
    //TODO: Pagination
    <div>
      <TableTopbar
        tableTitle={t("products")}
        hasDownload={false}
        searchFunction={(e) =>
          dispatch({ type: "search", payload: e.target.value })
        }
        addFunction={() => navigate("/restaurant/create-product")}
        hasStatusFilter={false}
      />
      <div className="grid grid-cols-4 gap-3 my-4">
        {data?.data.map((item) => (
          <FullImageCard
            key={item.id}
            type={t("order")}
            name={item.name}
            status={item.isActive}
            menu={{
              items: [
                {
                  label: t("edit"),
                  onClick: () =>
                    navigate(`/restaurant/edit-product/${item.id}`),
                },
                {
                  label: item.isActive ? t("deactivate") : t("activate"),
                  onClick: async () => {
                    await updateItem({ ...item, isActive: !item.isActive });
                    refetch();
                  },
                },
                {
                  label: t("delete"),
                  danger: true,

                  onClick: () =>
                    confirm({
                      title: t("areYouSure"),
                      subtitle: t("deleteProduct"),
                    }).then(async () => {
                      await deleteItem(item.id);
                      refetch();
                    }),
                },
              ],
            }}
            count={0}
            image={
              item.image ??
              "https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg"
            }
          />
        ))}
      </div>
      <div className="flex items-center justify-center ">
        {!isPending && (
          <Pagination
            size="large"
            current={data?.pagination?.current}
            total={data?.pagination?.total}
            pageSize={data?.pagination?.pageSize}
            onChange={(current, pageSize) =>
              dispatch({ type: "paginate", payload: { current, pageSize } })
            }
          />
        )}
      </div>
    </div>
  );
}
