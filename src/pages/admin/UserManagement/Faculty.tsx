import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";

import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types/index.type";
import moment from "moment";
import {
  useDeleteFacultyMutation,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/userManagementApi";
import { TFaculty } from "../../../types/faculty.types";
import FacultyModal from "../../../components/modal/admin/userManagement/FacultyModal";
import FacultyDetailsModal from "../../../components/modal/admin/userManagement/FacultyDetailsModal";

const Faculty = () => {
  const { Search } = Input;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [detailsModalVisible, setDetailsModalVisible] =
    useState<boolean>(false);
  const [editingStudent, setEditingFaculty] =
    useState<Partial<TFaculty> | null>(null);
  const {
    data: faculties,
    isLoading: isLoadingFaculty,
    isFetching,
  } = useGetAllFacultyQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const [deleteFaculty] = useDeleteFacultyMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name: TFaculty["name"]) =>
        `${name.firstName} ${name.middleName ? name.middleName : ""} ${
          name.lastName
        }`,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "Id",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "Id",
    },
    {
      title: "department",
      dataIndex: "academicDepartment",
      render: (academicDepartment: TFaculty["academicDepartment"]) =>
        academicDepartment.name,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      render: (text: Date) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      render: (_: TFaculty, record: TFaculty) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EyeFilled />}
              onClick={() => {
                setDetailsModalVisible(true);
                setEditingFaculty(record);
              }}
            >
              Details
            </Button>
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingFaculty(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the faculty"
              description="Are you sure to delete this faculty?"
              onConfirm={() => handleDeleteFaculty(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record._id}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteFaculty = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteFaculty(id).unwrap()) as TResponse<TFaculty>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete faculty"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Faculty</h2>
        <Search
          placeholder="Search faculty"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add faculty
        </Button>
      </div>

      {isLoadingFaculty ? (
        <>
          <Skeleton active paragraph={{ rows: 14 }} />
        </>
      ) : faculties?.meta?.total === 0 ? (
        <Empty description="No faculty found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={faculties?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          loading={isLoadingFaculty || isFetching}
          pagination={{
            position: ["bottomCenter"],
            total: faculties?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* View details faculty modal */}
      <FacultyDetailsModal
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        setEditingFaculty={setEditingFaculty}
        editingFaculty={editingStudent}
      />

      {/* Create and update student modal*/}
      <FacultyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setEditingFaculty={setEditingFaculty}
        editingFaculty={editingStudent}
      />
    </div>
  );
};

export default Faculty;
