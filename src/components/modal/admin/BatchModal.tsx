import { Button, Form, message, Modal, Skeleton } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { useInsertBatchMutation } from "../../../redux/features/admin/batchApi";
import { TAcademicDepartment } from "../../../types/academicDepartment.types";
import { TResponse } from "../../../types/index.type";
import { TBatch } from "../../../types/student.types";
import MyInp from "../../ui/Form/MyInp";

type TProps = {
  open: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const BatchModal = ({ open, setModalVisible }: TProps) => {
  const [form] = Form.useForm();
  const { data: academicDepartment, isLoading: isAcademicDepartmentLoading } =
    useGetAllAcademicDepartmentQuery([]);
  const [createBatch, { isLoading: isLoadingCreateBatch }] =
    useInsertBatchMutation();

  const handleCreateBatch = async (values: TAcademicDepartment) => {
    try {
      const result = (await createBatch(values).unwrap()) as TResponse<TBatch>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to add academic department"
      );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setModalVisible(false);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">Add new batch</h2>
      {isAcademicDepartmentLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Form layout="vertical" form={form} onFinish={handleCreateBatch}>
          {/* Academic department */}
          <MyInp
            name="department"
            rules={[
              {
                required: true,
                message: "Please select an academic department!",
              },
            ]}
            label="Department"
            placeholder="Select a department"
            type="select"
            size="large"
            options={academicDepartment?.data?.map(
              (item: TAcademicDepartment) => ({
                value: item?._id,
                label: <span>{item?.name}</span>,
              })
            )}
          />

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              loading={isLoadingCreateBatch || isAcademicDepartmentLoading}
              htmlType="submit"
              block
              size="large"
            >
              Insert batch
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default BatchModal;
