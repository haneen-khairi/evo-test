import styled from "styled-components";
import { Input } from "antd";

const StyledInput = styled(Input)`
  border: none !important;
  background-color: ${(props) => props.theme.token.colorSecondary} !important;

  border-radius: 12 !important;
`;
export default StyledInput;
