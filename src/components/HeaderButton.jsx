import { Button } from "antd";
import { forwardRef } from "react";

import "./headerbutton.css";

const HeaderButton = forwardRef((props) => {
  const { icon, ...rest } = props;
  return (
    <Button {...rest} shape="circle" size="large">
      {icon}
    </Button>
  );
});
export default HeaderButton;
