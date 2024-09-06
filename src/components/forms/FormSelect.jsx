import styled from "styled-components";
import { Select } from "antd";

const BgSelect = styled(Select)`
  & div.ant-select-selector {
    border: none !important;
    background-color: ${(props) => props.theme.token.colorSecondary} !important;
    border-radius: 12px;
  }
`;
export default BgSelect;
