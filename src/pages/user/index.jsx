import { Form, Avatar, Flex, Dropdown, Button } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import FormSelect from "@/components/forms/FormSelect";
import CustomCard from "@/components/CardWithHeader";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSelf, editSelf } from "@/services/users";
import useResultModal from "@/hooks/useResultModal";
import { useSelector } from "react-redux";
import PlaceHolderImage from "@/assets/avatar-image.webp";
import AvatarWithAnchor from "../../components/AvatarWithAnchor";
export default function UserProfile() {
  const globalModal = useResultModal();
  const [form] = Form.useForm();
  const [userPicture, setUserPicture] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { data, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getSelf();
    },
  });
  const updateUserMutation = useMutation({
    mutationFn: (values) => {
      return editSelf({ ...values });
    },
    mutationKey: ["updateUser"],
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("userUpdatedSuccessfully"),
      });
    },
    onError: (e) => {
      globalModal.error(
        t("updateFailed"),
        t("userUpdateFailed"),
        e.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data.data);
      setUserPicture(data.data.picture);
    }
  }, [data]);

  function handleUpdateUser(values) {
    if (userPicture) {
      values.picture = userPicture;
    }
    updateUserMutation.mutate(values);
  }
  return (
    <CustomCard className="w-10/12 mx-auto p-4">
      <Form form={form} onFinish={handleUpdateUser} layout="vertical">
        <Flex className="flex-col gap-4">
          <Flex className="w-full items-center justify-center p-4">
            <input
              type="file"
              style={{
                display: "none",
              }}
              id="userPhoto"
              onChange={(e) => {
                setUserPicture(e.target.files[0]);
              }}
            />
            <AvatarWithAnchor
              avatarProps={{
                size: 180,
                shape: "circle",
                src: userPicture
                  ? userPicture instanceof File
                    ? URL.createObjectURL(userPicture)
                    : userPicture
                  : PlaceHolderImage,
              }}
            >
              <Dropdown
                trigger={"click"}
                placement="bottomCenter"
                menu={{
                  items: [
                    userPicture && {
                      label: t("remove"),
                      onClick: () => {
                        setUserPicture(undefined);
                      },
                    },

                    {
                      label: t("change"),
                      onClick: () => {
                        document.getElementById("userPhoto").click();
                      },
                    },
                  ],
                }}
              >
                <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  icon={<FaPlus />}
                />
              </Dropdown>
            </AvatarWithAnchor>
          </Flex>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item label={t("firstName")} name="firstName">
              <FormInput size="large" />
            </Form.Item>
            <Form.Item label={t("lastName")} name="lastName">
              <FormInput size="large" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item label={t("username")} name="userName">
              <FormInput size="large" />
            </Form.Item>
            <Form.Item label={t("sex")} name="gender">
              <FormSelect
                size="large"
                options={[
                  { label: t("male"), value: 0 },
                  { label: t("female"), value: 1 },
                ]}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item label={t("email")} name="email">
              <FormInput size="large" />
            </Form.Item>
            <Form.Item label={t("phoneNumber")} name="phoneNumber">
              <FormInput size="large" inputmode="tel" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item label={t("previousPassword")} name="oldPassword">
              <FormInput.Password size="large" />
            </Form.Item>
            <Form.Item
              label={t("newPassword")}
              name="password"
              rules={[
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                  message: t("passwordValidation"),
                },
              ]}
            >
              <FormInput.Password size="large" />
            </Form.Item>
          </div>
          <div className="flex justify-center ">
            <FormButton
              type="primary"
              htmlType="submit"
              className="w-8/12"
              loading={updateUserMutation.isPending}
            >
              {t("saveAndSubmit")}
            </FormButton>
          </div>
        </Flex>
      </Form>
    </CustomCard>
  );
}
