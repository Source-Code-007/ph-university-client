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
import { TAdmin } from "../../../types/admin.types"; // Ensure the path is correct
import AdminModal from "../../../components/modal/admin/userManagement/AdminModal";
import AdminDetailsModal from "../../../components/modal/admin/userManagement/AdminDetailsModal";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "../../../redux/features/admin/userManagementApi";

const Admin = () => {
  const { Search } = Input;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [detailsModalVisible, setDetailsModalVisible] =
    useState<boolean>(false);
  const [editingAdmin, setEditingAdmin] = useState<Partial<TAdmin> | null>(
    null
  );
  const {
    data: admins,
    isLoading: isLoadingAdmin,
    isFetching,
  } = useGetAllAdminQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const [deleteAdmin] = useDeleteAdminMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Admin",
      key: "Admin",
      render: (record: TAdmin) => (
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10"
            src={record.profileImg}
            alt={record?.name?.lastName as string}
          />
          <div className="space-y-2">
            <h2 className="font-semibold">
              {record.name?.firstName} {record.name?.middleName || ""}{" "}
              {record.name?.lastName}
            </h2>
            <p>{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "DOB",
      render: (text: string) => moment(text).format("D-MM-YYYY"),
    },
    {
      title: "Actions",
      key: "Actions",
      render: (_: TAdmin, record: TAdmin) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EyeFilled />}
              onClick={() => {
                setDetailsModalVisible(true);
                setEditingAdmin(record);
              }}
            >
              Details
            </Button>
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingAdmin(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the admin"
              description="Are you sure to delete this admin?"
              onConfirm={() => handleDeleteAdmin(record._id)}
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

  const handleDeleteAdmin = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteAdmin(id).unwrap()) as TResponse<TAdmin>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to delete admin");
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Admin</h2>
        <Search
          placeholder="Search admin"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add admin
        </Button>
      </div>

      {isLoadingAdmin ? (
        <>
          <Skeleton active paragraph={{ rows: 14 }} />
        </>
      ) : admins?.meta?.total === 0 ? (
        <Empty description="No admin found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={admins?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          loading={isLoadingAdmin || isFetching}
          pagination={{
            position: ["bottomCenter"],
            total: admins?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* View details admin modal */}
      <AdminDetailsModal
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        setEditingAdmin={setEditingAdmin}
        editingAdmin={editingAdmin}
      />

      {/* Create and update admin modal*/}
      <AdminModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setEditingAdmin={setEditingAdmin}
        editingAdmin={editingAdmin}
      />
    </div>
  );
};

export default Admin;
