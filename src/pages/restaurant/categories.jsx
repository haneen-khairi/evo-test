import { Pagination } from "antd";
import TableTopbar from "@/components/TableTopbar";
import { t } from "i18next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCategories,
  updateCategory,
  deleteCategory,
} from "@/services/restaurantCategories";
import FullImageCard from "@/components/restaurant/FullImageItemCard";
import { useNavigate } from "react-router-dom";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import useResultModal from "@/hooks/useResultModal";
export default function Categories() {
  const globalModal = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["restaurantCategories", filterOptions],
    queryFn: () => fetchAllCategories({ ...filterOptions }),
  });
  const navigate = useNavigate();
  return (
    //TODO: Pagination
    <div>
      <TableTopbar
        tableTitle={t("categories")}
        hasDownload={false}
        searchFunction={(e) =>
          dispatch({ type: "search", payload: e.target.value })
        }
        addFunction={(e) => navigate("/restaurant/create-category")}
        hasStatusFilter={false}
      />
      <div className="grid grid-cols-4 gap-3 my-3">
        {data?.data.map((item) => (
          <FullImageCard
            type={t("category")}
            name={item.name}
            status={item.isActive}
            menu={{
              items: [
                {
                  label: t("edit"),
                  onClick: () =>
                    navigate(`/restaurant/edit-category/${item.id}`),
                },
                {
                  label: item.isActive ? t("deactivate") : t("activate"),
                  onClick: async () => {
                    await updateCategory({ ...item, isActive: !item.isActive });
                    refetch();
                  },
                },
                {
                  label: t("delete"),
                  danger: true,

                  onClick: async () => {
                    globalModal
                      .confirm({
                        title: t("areYouSure"),
                        content: t("deleteCategory"),
                      })
                      .then(async () => {
                        await deleteCategory(item.id);
                        refetch();
                      });
                  },
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
            current={data?.pagination.current}
            total={data?.pagination.total}
            pageSize={data?.pagination.pageSize}
            onChange={(current, pageSize) =>
              dispatch({ type: "paginate", payload: { current, pageSize } })
            }
          />
        )}
      </div>
    </div>
  );
}
