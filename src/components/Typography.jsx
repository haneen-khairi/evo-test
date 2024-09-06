import { Typography } from "antd";
export default function CustomTypograhy({
  variant,
  isBold = false,
  weight,
  fontSize = 18,
  style,
  ...rest
}) {
  let customStyle = {
    fontSize: fontSize,
    color: variant == "primary" ? "#000000" : "#828282",
    fontWeight: isBold ? "700" : "400",
  };

  return (
    <Typography
      style={{
        ...customStyle,
        ...style,
      }}
      {...rest}
    />
  );
}
