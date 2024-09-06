import styled from "styled-components";
import { TimePicker } from "antd";
const BgTimePicker = styled(TimePicker)`
  & {
    border: none !important;
    border-radius: 12px;
    height: 42px !important;
  }
  width: 100%;
  background-color: ${(props) => props.theme.token.colorSecondary};
`;
export default BgTimePicker;
