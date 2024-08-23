import { Button, Form, message, Modal, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import MyInp from "../../../ui/Form/MyInp";
import {
  useInsertStudentMutation,
  useUpdateStudentMutation,
} from "../../../../redux/features/admin/userManagementApi";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagementApi";
import { TBatch, TStudent } from "../../../../types/student.types";
import { TResponse } from "../../../../types/index.type";
import { TAcademicDepartment } from "../../../../types/academicDepartment.types";
import { useGetAllBatchQuery } from "../../../../redux/features/admin/batchApi";

type TProps = {
  modalVisible: boolean;
  editingStudent: Partial<TStudent> | null;
  setEditingStudent: React.Dispatch<
    React.SetStateAction<Partial<TStudent> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentModal = ({
  modalVisible,
  setModalVisible,
  editingStudent,
  setEditingStudent,
}: TProps) => {
  const [form] = Form.useForm();
  const [selectedAcademicDepartment, setSelectedAcademicDepartment] =
    useState(null);
  const { data: academicDepartments, isLoading: isLoadingAcademicDepartments } =
    useGetAllAcademicDepartmentQuery([]);
  const { data: batches, isLoading: isLoadingBatches } = useGetAllBatchQuery([
    {
      name: "department",
      value: selectedAcademicDepartment,
    },
  ]);
  const [createStudent, { isLoading: isLoadingCreateStudent }] =
    useInsertStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  useEffect(() => {
    if (editingStudent) {
      form.setFieldsValue({
        ...editingStudent,
        academicInfo: {
          department: editingStudent.academicInfo?.department?._id,
          batch: {
            value: editingStudent.academicInfo?.batch?._id,
            label: editingStudent.academicInfo?.batch?.batch,
          },
        },
      });
    }
  }, [form, editingStudent]);

  console.log(editingStudent?.name, "name");

  const handleCreateStudent = async (values: TStudent) => {
    try {
      const result = (await createStudent(
        values
      ).unwrap()) as TResponse<TStudent>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to add student");
    } finally {
      setEditingStudent(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateStudent = async (values: Partial<TStudent>) => {
    try {
      const res = (await updateStudent({
        ...values,
        _id: editingStudent?._id,
      }).unwrap()) as TResponse<TStudent>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || "Failed to update student"
      );
    } finally {
      setEditingStudent(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={modalVisible}
      onCancel={() => {
        form.resetFields();
        setEditingStudent(null);
        setModalVisible(false);
      }}
      width={1000}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingStudent ? "Update student" : "Add student"}
      </h2>
      {isLoadingAcademicDepartments || isLoadingBatches ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={editingStudent ? handleUpdateStudent : handleCreateStudent}
        >
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="flex flex-wrap gap-4">
              <MyInp
                name={["name", "firstName"]}
                rules={[
                  {
                    required: true,
                    message: "Please input first name!",
                  },
                ]}
                label="First Name"
                placeholder="Enter first name"
                type="text"
                size="large"
              />
              <MyInp
                name={["name", "middleName"]}
                label="Middle Name"
                placeholder="Enter middle name"
                type="text"
                size="large"
              />
              <MyInp
                name={["name", "lastName"]}
                rules={[
                  {
                    required: true,
                    message: "Please input last name!",
                  },
                ]}
                label="Last Name"
                placeholder="Enter last name"
                type="text"
                size="large"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <MyInp
                name="gender"
                label="Gender"
                placeholder="Select gender"
                type="select"
                size="large"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
              <MyInp
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="Select date of birth"
                type="date"
                size="large"
              />
              <MyInp
                name="bloodGroup"
                label="Blood Group"
                placeholder="Enter blood group"
                type="text"
                size="large"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <MyInp
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
                size="large"
              />
              <MyInp
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                type="text"
                size="large"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <MyInp
                name="nid"
                label="National ID"
                placeholder="Enter national ID"
                type="text"
                size="large"
              />
              <MyInp
                name="presentAddress"
                label="Present Address"
                placeholder="Enter present address"
                type="text"
                size="large"
              />
              <MyInp
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Enter permanent address"
                type="text"
                size="large"
              />
            </div>
          </div>

          {/* Guardian Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2 mt-6">
              Guardian Information
            </h3>
            <div className="flex flex-wrap gap-4">
              <MyInp
                name={["guardian", "name"]}
                label="Guardian Name"
                placeholder="Enter guardian's name"
                type="text"
                size="large"
              />
              <MyInp
                name={["guardian", "phone"]}
                label="Guardian Phone"
                placeholder="Enter guardian's phone number"
                type="text"
                size="large"
              />
              <MyInp
                name={["guardian", "email"]}
                label="Guardian Email"
                placeholder="Enter guardian's email"
                type="email"
                size="large"
              />
              <MyInp
                name={["guardian", "age"]}
                label="Guardian Age"
                placeholder="Enter guardian's age"
                type="text"
                size="large"
              />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2 mt-6">
              Academic Information
            </h3>
            <div className="flex flex-wrap gap-4">
              <Form.Item
                name={["academicInfo", "department"]}
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please select a department!",
                  },
                ]}
                className="flex-1"
              >
                <Select
                  placeholder="Select department"
                  size="large"
                  value={selectedAcademicDepartment}
                  disabled={editingStudent ? true : false}
                  onChange={(e) => {
                    setSelectedAcademicDepartment(e);
                    console.log(e, "e");
                  }}
                  options={academicDepartments?.data?.map(
                    (item: TAcademicDepartment) => ({
                      value: item?._id,
                      label: <span>{item?.name}</span>,
                    })
                  )}
                />
              </Form.Item>
              <MyInp
                name={["academicInfo", "batch"]}
                label="Batch"
                placeholder="Select batch"
                type="select"
                size="large"
                disabled={editingStudent ? true : false}
                options={batches?.data?.map((item: TBatch) => ({
                  value: item?._id,
                  label: <span>{item?.batch}</span>,
                }))}
              />
              <MyInp
                name={["academicInfo", "admissionDate"]}
                label="Admission Date"
                disabled={editingStudent ? true : false}
                placeholder="Select admission date"
                type="date"
                size="large"
              />
            </div>
          </div>
          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              loading={
                editingStudent ? isLoadingCreateStudent : isLoadingCreateStudent
              }
              htmlType="submit"
              block
              size="large"
            >
              {editingStudent ? "Update student" : "Insert student"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default StudentModal;
