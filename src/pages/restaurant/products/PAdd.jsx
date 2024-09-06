import { useMutation } from "@tanstack/react-query";
import { createItem } from "../../../services/restaurantItems.js";
import { t } from "i18next";
import useResultModal from "@/hooks/useResultModal";
import { useState } from "react";
import ProductsForm from "./PForm.jsx";
import { Form } from "antd";
export default function AddProduct() {
  const globalModal = useResultModal();
  const [image, setImage] = useState();
  const [form] = Form.useForm();
  const createProductMutation = useMutation({
    mutationFn: (values) => createItem(values),
    mutationKey: ["createProduct"],
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("productCreatedSuccessfully"),
      });
    },
    onError: () => {
      globalModal.error(t("error"), t("errorWhileCreatingProduct"));
    },
  });
  function handleAddProduct(values) {
    for (let allowedSize of values.allowedSizes) {
      values[allowedSize] = true;
    }
    delete values.allowedSizes;
    createProductMutation.mutate({
      ...values,
      image,
    });
  }
  return (
    <ProductsForm
      form={form}
      image={image}
      setImage={setImage}
      onFinish={handleAddProduct}
      loading={createProductMutation.isPending}
    />
  );
}
