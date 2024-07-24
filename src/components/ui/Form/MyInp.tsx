import { Form, Input } from "antd";
import React from "react";

type MyInpProps = {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea";
  rules: any[];
  placeholder: string;
  defaultValue?: string;
  size?: "small" | "middle" | "large";
};

// className="my-inp"
// defaultValue={"admin@gmail.com"}
const MyInp: React.FC<MyInpProps> = ({
  type,
  placeholder,
  name,
  label,
  rules,
  size,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      {type === "text" ? (
        <Input size={size} placeholder={placeholder} />
      ) : type === "password" ? (
        <Input.Password size={size} placeholder={placeholder} />
      ) : (
        <Input size={size} placeholder={placeholder} />
      )}
    </Form.Item>
  );
};

export default MyInp;
