import { Button, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
export default function NavigationButton({ icon, title, path }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <NavLink
      to={path ?? "/"}
      className={({ isActive }) => {
        setIsActive(isActive);
      }}
    >
      <Button
        style={{
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          color: "white",
          fontSize: "16px",
          padding: "20px",
        }}
        icon={icon}
        type={isActive ? "primary" : "text"}
      >
        {title}
      </Button>
    </NavLink>
  );
}
