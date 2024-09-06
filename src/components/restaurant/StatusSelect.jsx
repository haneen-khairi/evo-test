import styled from "styled-components";
import { Radio } from "antd";
import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchStatistics } from "@/services/restaurantOrders";
import useTheme from "@/hooks/useTheme";

const { Group, Button } = Radio;

const CustomRadioGroup = styled(Group)`
  & {
    display: flex;
    gap: 15px;
  }
`;
const CustomRadioButton = styled(Button)`
  & {
    border-radius: 25px !important;
    border: none;
    padding-left: 30px;
  }
  &::before {
    display: none !important;
  }
  &::after {
    content: ${(props) => `"${props.count}"`};
    display: ${(props) => (props.hasCount === false ? "none" : "flex")};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f5fbfb;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    align-items: center;
    justify-content: center;
    color: #38acb1;
    font-size: 12px;
    font-weight: 700;
  }
`;
export const statuses = [
  "pending",
  "approved",
  "preparing",
  "ready",
  "delivering",
  "delivered",
  "declined",
  "canceled",
];
export default function StatusSelect({ onChange, value, ...props }) {
  const { data } = useQuery({
    queryKey: ["restaurantStatistics", value],
    queryFn: fetchStatistics,
  });
  const { token } = useTheme();
  const total =
    data?.data?.pending +
      data?.data?.approved +
      data?.data?.preparing +
      data?.data?.ready +
      data?.data?.delivering +
      data?.data?.delivered +
      data?.data?.declined +
      data?.data?.canceled || 0;
  console.log(total);
  return (
    <CustomRadioGroup
      defaultValue="all"
      buttonStyle="solid"
      className="p-2 rounded-xl mb-2"
      style={{
        backgroundColor: token.colorSecondary,
      }}
      size="large"
      name="status"
      onChange={onChange}
      value={value}
      {...props}
    >
      <CustomRadioButton value="all" count={total} hasCount={total > 0}>
        {t("all")}
      </CustomRadioButton>
      {statuses.map((status) => (
        <CustomRadioButton
          key={status}
          value={status}
          count={data?.data?.[status] ?? 0}
          hasCount={data?.data?.[status] > 0}
        >
          {t(status)}
        </CustomRadioButton>
      ))}
    </CustomRadioGroup>
  );
}
