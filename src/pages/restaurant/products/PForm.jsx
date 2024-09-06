import { Form } from "antd";
import { t } from "i18next";
import FormInput from "@/components/forms/FormInput.jsx";
import FormSelect from "@/components/forms/FormSelect.jsx";
import FormButton from "@/components/forms/FormButton.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/services/restaurantCategories.js";
import { ImagePicker } from "@/components/forms/ImagePicker";
export default function ProductsForm({
  onFinish,
  form,
  loading,
  image,
  setImage,
}) {
  const { data: categories, isPending: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetchAllCategories({
        isActive: true,
      }),
  });
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <input
        type="file"
        id="productImage"
        accept="image/*"
        hidden
        style={{
          display: "none",
        }}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <div className="flex gap-4 wrap">
        <Form.Item
          className="grow"
          name="nameAr"
          label={t("nameInAr")}
          rules={[
            {
              required: true,
              message: t("requiredField"),
            },
          ]}
        >
          <FormInput size="large" />
        </Form.Item>
        <Form.Item
          className="grow"
          name="nameEn"
          label={t("nameInEn")}
          rules={[
            {
              required: true,
              message: t("requiredField"),
            },
          ]}
        >
          <FormInput size="large" />
        </Form.Item>
      </div>
      <div className="flex gap-4">
        <Form.Item
          className="w-1/2"
          label={t("category")}
          name="categoryId"
          rules={[
            {
              required: true,
              message: t("requiredField"),
            },
          ]}
        >
          <FormSelect
            size="large"
            options={categories?.data?.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            loading={categoriesLoading}
          />
        </Form.Item>
        <Form.Item
          className="w-1/3"
          label={t("allowedSizes")}
          name="allowedSizes"
        >
          <FormSelect
            mode="multiple"
            allowClear
            size="large"
            options={[
              { label: t("small"), value: "allowSizeSmall" },
              { label: t("medium"), value: "allowSizeMedium" },
              { label: t("large"), value: "allowSizeLarge" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={t("allowSugar")}
          className="w-1/3"
          name={"allowSugar"}
        >
          <FormSelect
            size="large"
            options={[
              { label: t("yes"), value: true },
              { label: t("no"), value: false },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex gap-4">
        <Form.Item label={t("image")} className="w-1/2">
          <ImagePicker
            onClick={() => {
              document.getElementById("productImage").click();
            }}
            image={image}
          />
        </Form.Item>
      </div>
      <div className="grid place-items-center mb-2">
        <FormButton
          type="primary"
          className="w-2/4"
          htmlType="submit"
          loading={loading}
        >
          {t("saveAndSubmit")}
        </FormButton>
      </div>
    </Form>
  );
}
