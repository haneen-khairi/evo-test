import { Form } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import FormSelect from "@/components/forms/FormSelect";
import { t } from "i18next";
export default function BuildingsForm({
  form,
  onSubmit,
  loading,
  initialValues = {},
}) {
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      name="create-building"
      initialValues={initialValues}
    >
      <div className="flex gap-4">
        <Form.Item
          className="grow"
          name="nameAr"
          label={t("nameInAr")}
          rules={[{ required: true }]}
        >
          <FormInput size="large" placeholder={t("nameInAr")} />
        </Form.Item>

        <Form.Item
          className="grow"
          name="nameEn"
          label={t("nameInEn")}
          rules={[{ required: true }]}
        >
          <FormInput size="large" placeholder={t("nameInEn")} />
        </Form.Item>
      </div>
      <Form.Item className="grow" name="isActive" label={t("status")}>
        <FormSelect
          size="large"
          placeholder={t("status")}
          options={[
            { value: "true", label: t("active") },
            { value: "false", label: t("inActive") },
          ]}
        />
      </Form.Item>
      <div className="flex items-center justify-center">
        <FormButton
          htmlType="submit"
          className="w-1/2 mx-auto"
          type="primary"
          loading={loading}
        >
          {t("saveAndSubmit")}
        </FormButton>
      </div>
    </Form>
  );
}
