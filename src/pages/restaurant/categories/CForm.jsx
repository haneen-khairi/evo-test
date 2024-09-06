import { Form } from "antd";
import { t } from "i18next";
import FormButton from "@/components/forms/FormButton.jsx";
import FormSelect from "@/components/forms/FormSelect.jsx";
import FormInput from "@/components/forms/FormInput.jsx";
import { ImagePicker } from "@/components/forms/ImagePicker";

export default function CategoriesForm({
  onFinish,
  image,
  setImage,
  form,
  isSubmitting,
}) {
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <input
        type="file"
        id="categoryImage"
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
        <Form.Item className="w-1/2" label={t("status")} name="isActive">
          <FormSelect
            size="large"
            options={[
              {
                label: t("active"),
                value: true,
              },
              {
                label: t("inActive"),
                value: false,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={t("image")} className="w-1/2">
          <ImagePicker
            image={image}
            onClick={() => {
              document.getElementById("categoryImage").click();
            }}
          />
        </Form.Item>
      </div>
      <div className="grid place-items-center mb-2">
        <FormButton
          type="primary"
          className="w-2/4"
          htmlType="submit"
          loading={isSubmitting}
        >
          {t("saveAndSubmit")}
        </FormButton>
      </div>
    </Form>
  );
}
