import { Form } from "antd";
import { useEffect, useState } from "react";
import CategoriesForm from "./CForm.jsx";
import useResultModal from "@/hooks/useResultModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchOneCategory,
  updateCategory,
} from "../../../services/restaurantCategories.js";
import { t } from "i18next";
export default function EditCategory({ id }) {
  const [form] = Form.useForm();
  const globalModal = useResultModal();
  const [image, setImage] = useState(null);
  const { data: category, isPending: categoryLoading } = useQuery({
    queryKey: ["fetchCategory", id],
    queryFn: () => fetchOneCategory(id),
    staleTime: 0,
  });
  const editCategoryMutation = useMutation({
    mutationFn: (values) => updateCategory(values),
    mutationKey: ["updateCategory"],
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("categoryUpdatedSuccessfully"),
      });
    },
    onError: (e) => {
      globalModal.error(t("error"), t("somethingWentWrong"));
    },
  });
  useEffect(() => {
    if (!categoryLoading) {
      form.setFieldsValue(category?.data);
      setImage(category?.data.image);
    }
  }, [categoryLoading]);
  function handleEditCategory(values) {
    editCategoryMutation.mutate({ id, image, ...values });
  }
  return (
    <CategoriesForm
      form={form}
      loading={true}
      onFinish={handleEditCategory}
      setImage={setImage}
      image={image}
    />
  );
}
