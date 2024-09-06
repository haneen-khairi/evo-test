import { Button } from "antd";
import { forwardRef } from "react";
const CustomButton = forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return (
    <Button
      style={{
        borderRadius: "20px",
        ...style,
      }}
      {...rest}
    >
      {props.children}
    </Button>
  );
});
export default CustomButton;
