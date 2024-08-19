import { Button, Empty, message, Skeleton, Table } from "antd";
import {
  useDeleteAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
  useInsertAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} from "../../../redux/features/admin/academicManagementApi";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam } from "../../../types/index.type";

const AcademicDepartment = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([
    { name: "limit", value: 10 },
    { name: "page", value: 1 },
  ]);
  const { data: academicDepartment, isLoading: isLoadingAcademicDepartment } =
    useGetAllAcademicDepartmentQuery(params);
  const [
    insertAcademicDepartment,
    { isLoading: isLoadingCreateAcademicDepartment },
  ] = useInsertAcademicDepartmentMutation();
  const [
    updateAcademicDepartment,
    { isLoading: isLoadingUpdateAcademicDepartment },
  ] = useUpdateAcademicDepartmentMutation();
  const [
    deleteAcademicDepartment,
    { isLoading: isLoadingDeleteAcademicDepartment },
  ] = useDeleteAcademicDepartmentMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic faculty",
      dataIndex: "academicFaculty",
      render: (academicFaculty: any) => academicFaculty?.name,
    },
    {
      title: "Students",
      dataIndex: "totalStudent",
    },
    {
      title: "Faculties",
      dataIndex: "totalFaculty",
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => console.log("edit", record?._id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteFilled />}
            onClick={() => console.log("delete", record?._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleAddAcademicDepartment = async (values: any) => {
    try {
      const res = await insertAcademicDepartment(values).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.error?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          error?.message ||
          "Failed to add academic department"
      );
      console.log("error", error);
    }
  };

  const handleDeleteAcademicDepartment = async (id: string) => {
    try {
      const res = await deleteAcademicDepartment(id).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.error?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          error?.message ||
          "Failed to delete academic department"
      );
    }
  };

  const handleUpdateAcademicDepartment = async (values: any) => {
    try {
      const res = await updateAcademicDepartment(values).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.error?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update academic department"
      );
    }
  };

  console.log(academicDepartment);

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Academic department</h2>
        <Button type="primary">Add academic dept</Button>
      </div>

      {isLoadingAcademicDepartment ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : academicDepartment?.meta?.total === 0 ? (
        <Empty description="No academic dept found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={academicDepartment?.data}
          scroll={{ x: 800 }}
        />
      )}
    </div>
  );
};

export default AcademicDepartment;
