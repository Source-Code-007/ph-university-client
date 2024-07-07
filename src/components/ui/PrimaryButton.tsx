import { Button } from "antd";

const PrimaryButton = ({ type, children }) => {
  return (
    <Button
      type={type ? type : "text"}
      className="bg-primary px-4 py-2 rounded text-white text-[18px] font-bold flex items-center justify-center gap-1"
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
