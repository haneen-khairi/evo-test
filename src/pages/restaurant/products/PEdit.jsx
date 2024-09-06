import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOneItem, updateItem } from "../../../services/restaurantItems.js";
import { Form } from "antd";
import { useEffect, useState } from "react";
import ProductsForm from "./PForm.jsx";
import useResultModal from "@/hooks/useResultModal";
import { t } from "i18next";
export default function EditProduct({ id }) {
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const globalModal = useResultModal();
  const { data: product, isPending: productLoading } = useQuery({
    queryKey: ["fetchProduct", id],
    queryFn: () => fetchOneItem(id),
    enabled: !!id,
  });
  const editProductMutation = useMutation({
    mutationFn: (values) => updateItem(values),
    mutationKey: ["editProduct"],
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("productUpdatedSuccessfully"),
      });
    },
    onError: (e) => {
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        e.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });
  function handleEditProduct(values) {
    values = {
      allowSizeLarge: false,
      allowSizeMedium: false,
      allowSizeSmall: false,
      ...values,
    };
    for (let allowedSize of values.allowedSizes) {
      values[allowedSize] = true;
    }

    delete values.allowedSizes;
    values.image = image;
    editProductMutation.mutate({ id, ...values });
  }

  useEffect(() => {
    if (!productLoading) {
      let allowedSizes = [];
      if (product?.data?.allowSizeSmall) allowedSizes.push("allowSizeSmall");
      if (product?.data?.allowSizeMedium) allowedSizes.push("allowSizeMedium");
      if (product?.data?.allowSizeLarge) allowedSizes.push("allowSizeLarge");
      form.setFieldsValue({ ...product?.data, allowedSizes });
      setImage(product?.data.image);
    }
  }, [productLoading]);
  return (
    <ProductsForm
      form={form}
      image={image}
      setImage={setImage}
      loading={editProductMutation.isPending}
      onFinish={handleEditProduct}
    />
  );
}
