import styled from "styled-components";
import { Button } from "antd";
const BgButton = styled(Button)`
  &.ant-btn-default {
    background-color: ${(props) => props.theme.token.colorSecondary} !important;
    border: none !important;
    border-radius: 12px;
  }
  height: 42px !important;
`;
export default BgButton;
