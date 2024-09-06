import { forwardRef } from "react";
import { Input } from "antd";
import styled from "styled-components";

// const InputField = forwardRef((props, ref) => {
//   const { style, ...rest } = props;
//   return (
//     <Input
//       style={{ borderRadius: "20px", backgroundColor: "#fafafa", ...style }}
//       {...rest}
//     ></Input>
//   );
// });
const InputField = styled(Input)`
  border-radius: 20px;
  background-color: #fafafa;
`;

export default InputField;
