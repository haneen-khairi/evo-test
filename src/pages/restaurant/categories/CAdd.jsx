import { Form } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { createCategory } from "@/services/restaurantCategories.js";
import useResultModal from "@/hooks/useResultModal";
import CategoriesForm from "./CForm.jsx";
export default function AddCategory() {
  const [form] = Form.useForm();
  const globalModal = useResultModal();
  const [image, setImage] = useState(null);
  const createCategoryMutation = useMutation({
    mutationFn: (values) => createCategory(values),
    mutationKey: ["createCategory"],
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("categoryCreatedSuccessfully"),
      });
    },
    onError: () => {
      globalModal.error(t("error"), t("errorWhileCreatingCategory"));
    },
  });
  function handleAddCategory(values) {
    createCategoryMutation.mutate({
      image,

      ...values,
    });
  }
  return (
    <CategoriesForm
      onFinish={handleAddCategory}
      loading={createCategoryMutation.isPending}
      image={image}
      setImage={setImage}
      form={form}
    />
  );
}
