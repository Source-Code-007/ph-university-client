import { Button, Form, FormProps, message, Typography } from "antd";
import { useForgetPasswordMutation } from "../redux/features/auth/authApi";
import MyInp from "../components/ui/Form/MyInp";
import { UserOutlined } from "@ant-design/icons";

type TForgetPassFieldType = {
  id: string;
};

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [form] = Form.useForm();

  const handleForgetPassword: FormProps<TForgetPassFieldType>["onFinish"] =
    async (data) => {
      try {
        const result = await forgetPassword(data).unwrap();
        if (result.success) {
          message.success(result?.message);
          window.location.href = result?.data?.resetLink;
        }
      } catch (e: any) {
        message.error(e?.message || e?.data?.message);
      }
    };

  return (
    <div className="min-h-screen flex mx-auto justify-center items-center bg-slate-50">
      <div className="p-8 md:p-10 my-shadow-1 rounded-md w-5/6 sm:w-4/6 md:3/6 lg:w-2/6 bg-white">
        <Typography.Title level={3} className="!mb-0">
          Forget password
        </Typography.Title>
        <Form
          onFinish={handleForgetPassword}
          // initialValues={{ remember: true }}
          // autoComplete="off"
          form={form}
          layout="vertical"
          className="mt-2 "
        >
          <MyInp
            type="text"
            name="id"
            label="Id"
            size="large"
            prefix={<UserOutlined />}
            placeholder="Input your id"
            rules={[
              {
                required: true,
                message: "Id is required!",
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
            Forget password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
