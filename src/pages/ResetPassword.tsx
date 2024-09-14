import { Button, Form, FormProps, message, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import MyInp from "../components/ui/Form/MyInp";
import { LockOutlined } from "@ant-design/icons";
import { useResetPasswordMutation } from "../redux/features/auth/authApi";

type TResetPassFieldType = {
  newPassword: string;
};

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const handleResetPassword: FormProps<TResetPassFieldType>["onFinish"] =
    async (data) => {
      const payload = {
        ...data,
        id,
        token,
      };
      try {
        const result = await resetPassword(payload).unwrap();
        if (result.success) {
          message.success(result?.message);
          navigate("/");
        }
      } catch (e: any) {
        message.error(e?.message || e?.data?.message);
      }
    };

  return (
    <div className="min-h-screen flex mx-auto justify-center items-center bg-slate-50">
      <div className="p-8 md:p-10 my-shadow-1 rounded-md w-5/6 sm:w-4/6 md:3/6 lg:w-2/6 bg-white">
        <Typography.Title level={3} className="!mb-0">
          Reset password
        </Typography.Title>
        <Form
          onFinish={handleResetPassword}
          // initialValues={{ remember: true }}
          // autoComplete="off"
          form={form}
          layout="vertical"
          className="mt-2 "
        >
          <MyInp
            type="password"
            name="newPassword"
            label="New Password"
            size="large"
            prefix={<LockOutlined />}
            placeholder="Input your password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full !mt-8"
            loading={isLoading}
          >
            Reset password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
