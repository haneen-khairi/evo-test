import styled from "styled-components";
import { DatePicker } from "antd";

const BgDatePicker = styled(DatePicker)`
  & {
    border: none !important;
    border-radius: 12px;
    height: 42px !important;
  }
  background-color: ${(props) => {
    return props.theme.token.colorSecondary;
  }};
  width: 100%;
`;
export default BgDatePicker;
