import { Button, Empty, message, Select, Skeleton, Table } from "antd";

import { useState } from "react";
import {
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
} from "../redux/features/admin/userManagementApi";
import { TStudent } from "../types/student.types";
import { TAcademicDepartment } from "../types/academicDepartment.types";
import { useToggleBloodDonorMutation } from "../redux/features/student/bloodBankApi";
import { useAppSelector } from "../redux/hook";
import { GiBlood } from "react-icons/gi";
import { bloodGroup } from "../constant/index.constant";
import { TBloodGroup } from "../types/index.type";

const BloodBank = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [toggleBloodDonor, { isLoading: isLoadingToggleBloodDonor }] =
    useToggleBloodDonorMutation();
  const user = useAppSelector((state) => state.auth?.user);
  const [filteredBg, setFilteredBg] = useState("");

  const {
    data: bloodDonor,
    isLoading: isLoadingBloodDonor,
    isFetching: isFetchingBloodDonor,
  } = useGetAllStudentQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    { name: "isBloodDonor", value: true },
    ...(filteredBg ? [{ name: "bloodGroup", value: filteredBg }] : []),
  ]);
  const { data: student, isLoading: isLoadingStudent } =
    useGetSingleStudentQuery(user?.id, { skip: !user });

  const columns = [
    {
      key: "index",
      title: "#",
      render: (_: TStudent, __: TStudent, index: number) => index + 1,
    },
    {
      title: "Department",
      dataIndex: "academicInfo",
      key: "department",
      render: (academicInfo: TStudent["academicInfo"]) =>
        academicInfo.department.name,
    },
    {
      title: "Batch",
      dataIndex: "academicInfo",
      key: "batch",
      render: (academicInfo: TStudent["academicInfo"]) =>
        academicInfo.batch.batch,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "BG",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
      render: (bg: TBloodGroup) => (
        <div>
          <span className="h-10 w-10 bg-red-500 rounded-full font-bold my-shadow-1 flex items-center justify-center text-white">
            {bg}
          </span>
        </div>
      ),
    },
  ];

  const toggleBloodDonorHandler = async () => {
    try {
      const res = await toggleBloodDonor(user?.id as string).unwrap();
      if (res.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (e: any) {
      message.error(e?.message || e?.data?.message);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4 justify-between mb-4 flex-wrap bg-white my-shadow-1 p-4 rounded-md w-4/6 sm:w-3/6 lg:w-2/6 mx-auto">
        <h2 className="font-bold text-xl md:text-2xl pb-2 border-b">
          Blood bank
        </h2>

        {isLoadingStudent ? (
          <Skeleton.Button className="!h-[30px] !w-[200px]" />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-center my-2 font-semibold text-lg">
              {student?.data?.isBloodDonor ? (
                <span className="flex gap-2 items-center">
                  I am a donor! <GiBlood className="text-red-500" />
                </span>
              ) : (
                <span className="flex gap-2 items-center">
                  I am not a donor! <GiBlood />
                </span>
              )}
            </div>
            <Button
              type="primary"
              // value={filteredDepartment}
              loading={isLoadingToggleBloodDonor}
              onClick={toggleBloodDonorHandler}
            >
              {student?.data?.isBloodDonor ? "Withdraw donorship" : "I agree"}
            </Button>
          </div>
        )}
      </div>

      <Select
        className="w-[200px] my-6"
        placeholder={"Filter by blood group"}
        options={Object.values(bloodGroup).map((bg) => ({
          label: bg,
          value: bg,
        }))}
        onChange={(value) => setFilteredBg(value)}
      />
      {isLoadingBloodDonor ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : bloodDonor?.meta?.total === 0 ? (
        <Empty description="No blood donor found!" />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={bloodDonor?.data}
            loading={isLoadingBloodDonor || isFetchingBloodDonor}
            scroll={{ x: 800 }}
            pagination={{
              position: ["bottomCenter"],
              total: bloodDonor?.meta?.total,
              current: pagination.page,
              pageSize: pagination.limit,
              onChange: (page, pageSize) => {
                setPagination({ page, limit: pageSize });
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default BloodBank;
