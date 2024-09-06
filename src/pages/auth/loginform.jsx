import { Flex, Typography, Divider, Form, Checkbox, Button } from "antd";
import { useTranslation } from "react-i18next";
import { CiMail, CiLock } from "react-icons/ci";
import CustomButton from "../../components/Button.jsx";
import CustomTypograhy from "../../components/Typography.jsx";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField.jsx";
//hooks
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
//toast
import loginFunction from "@/services/login.js";
import useResultModal from "../../hooks/useResultModal.js";
import OTPModal from "./OTPModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "@/slices/AuthSlice.js";
import getUserHome from "../../utils/getUserHome.js";

export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const globalModal = useResultModal();
  const [needsOTP, setNeedsOTP] = useState(false);
  const [error, setError] = useState(null); // [error, setError
  const [data, setData] = useState(null);
  const [viewPassword, setViewPassword] = useState(false); // [error, setError
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      let result = await loginFunction({ ...values });
      setData(result.data);
      //Todo OTP
      //if otp do the OTP Flow else login normally
      setNeedsOTP(true);
    } catch (err) {
      console.log(err);
      globalModal.error(
        t("loginError"),
        t("loginErrorDesc"),
        err.response.data.errors.map((e) => <p>{e}</p>)
      );
    }
    setIsLoading(false);
  };
  const handleOTPLogin = async (values, form) => {
    setIsLoading(true);

    if (values.OTP.join("") == "123456") {
      dispatch(login(data));
      setNeedsOTP(false);
      globalModal.success({
        title: t("loginSuccess"),
        subtitle: t("loginSuccessDesc"),
        closable: false,
      });
      let from = searchParams.get("from");
      if (from) {
        navigate(from);
      } else {
        navigate(getUserHome(data.user));
      }
    } else {
      setError(t("wrongOTP"));
      form.resetFields();
    }
    setIsLoading(false);
  };

  return (
    <Flex vertical gap={"large"} style={{ width: "80%" }} className="relative">
      <div id="login-header">
        <Typography
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {t("welcomeBack")}
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            color: "#828282",
          }}
        >
          {t("loginToContinue")}
        </Typography>
      </div>
      <Flex id="login-form" vertical gap={"large"}>
        <Form name="login" onFinish={handleLogin}>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"} isBold={true}>
              {t("emailAddress")} / {t("username")}
            </CustomTypograhy>
            <Form.Item
              name="email"
              rules={[{ required: true, message: t("noEmailError") }]}
            >
              <InputField
                size="large"
                type="text"
                style={{ height: "59px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiMail color="#38ACB1" size={"1.5rem"} />
                    <Divider type="vertical" style={{ height: "30px" }} />
                  </div>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"} isBold={true}>
              {t("password")}
            </CustomTypograhy>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("noPasswordError") }]}
            >
              <InputField
                type={viewPassword ? "text" : "password"}
                size="large"
                style={{ height: "59px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiLock color="#38ACB1" size={"1.5rem"} />
                    <Divider type="vertical" style={{ height: "30px" }} />
                  </div>
                }
                suffix={
                  <Button
                    shape="circle"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Flex justify="space-between">
            <Form.Item name={"rememberMe"} valuePropName="checked">
              <Checkbox>
                <CustomTypograhy variant={"primary"} isBold>
                  {t("rememberMe")}
                </CustomTypograhy>
              </Checkbox>
            </Form.Item>
            <Link to="/auth/forgot-password">
              <CustomTypograhy isBold={true} variant={"primary"}>
                {t("forgotPassword")}
              </CustomTypograhy>
            </Link>
          </Flex>
          <Form.Item>
            <CustomButton
              style={{
                width: "100%",
                minHeight: "59px",
                fontSize: "20px",
              }}
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {t("login")}
            </CustomButton>
          </Form.Item>
          <div className="w-full text-center">
            {t("dontHaveAccount?")}{" "}
            <Link to="/auth/register">{t("register")}</Link>
          </div>
        </Form>
      </Flex>

      <OTPModal
        isOpen={needsOTP}
        onClose={() => {
          setNeedsOTP(false);
        }}
        handleSubmit={handleOTPLogin}
        error={error}
      />
    </Flex>
  );
}
