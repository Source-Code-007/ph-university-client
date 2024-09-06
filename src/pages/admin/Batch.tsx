import { Button, Empty, Select, Skeleton, Table } from "antd";

import { useState } from "react";
import { useGetAllBatchQuery } from "../../redux/features/admin/batchApi";
import { TAcademicDepartment } from "../../types/academicDepartment.types";
import BatchModal from "../../components/modal/admin/BatchModal";
import { TBatch } from "../../types/student.types";
import { useGetAllAcademicDepartmentQuery } from "../../redux/features/admin/academicManagementApi";

const Batch = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filteredDepartment, setFilteredDepartment] = useState(null);
  const {
    data: batch,
    isLoading: isLoadingBatch,
    isFetching: isFetchingBatch,
  } = useGetAllBatchQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(filteredDepartment
      ? [{ name: "department", value: filteredDepartment }]
      : []),
  ]);
  const { data: academicDepartment, isLoading: isLoadingAcademicDepartment } =
    useGetAllAcademicDepartmentQuery([{ name: "limit", value: 200 }]);

  const columns = [
    {
      key: "index",
      title: "#",
      render: (_: TBatch, __: TBatch, index: number) => index + 1,
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
      render: (department: Partial<TAcademicDepartment>) => department?.name,
    },
    {
      title: "Batch",
      key: "batch",
      dataIndex: "batch",
    },
    {
      title: "Total student",
      key: "totalStudent",
      dataIndex: "totalStudent",
    },
  ];

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4 flex-wrap">
        <h2 className="font-bold text-xl md:text-2xl">Batch</h2>

        {isLoadingAcademicDepartment ? (
          <Skeleton.Button className="!h-[30px] !w-[200px]" />
        ) : (
          <Select
            className="w-[200px]"
            placeholder="Filter by department"
            value={filteredDepartment}
            onChange={(value) => setFilteredDepartment(value)}
            options={academicDepartment?.data?.map(
              (dept: TAcademicDepartment) => ({
                label: dept?.shortName,
                value: dept?._id,
              })
            )}
          />
        )}

        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add batch
        </Button>
      </div>

      {isLoadingBatch ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : batch?.meta?.total === 0 ? (
        <Empty description="No batch found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={batch?.data}
          loading={isLoadingBatch || isFetchingBatch}
          rowClassName={(record) =>
            record?.totalStudent === 45
              ? "!bg-red-500 !bg-opacity-30 pointer-events-none"
              : ""
          }
          scroll={{ x: 800 }}
          pagination={{
            position: ["bottomCenter"],
            total: batch?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Create academic department modal*/}
      <BatchModal open={modalVisible} setModalVisible={setModalVisible} />
    </div>
  );
};

export default Batch;
