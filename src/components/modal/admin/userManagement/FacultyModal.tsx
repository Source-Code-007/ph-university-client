import { Button, Form, message, Modal, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import MyInp from "../../../ui/Form/MyInp";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagementApi";
import { TResponse } from "../../../../types/index.type";
import { TFaculty } from "../../../../types/faculty.types";
import {
  useInsertFacultyMutation,
  useUpdateFacultyMutation,
} from "../../../../redux/features/admin/userManagementApi";
import { TAcademicDepartment } from "../../../../types/academicDepartment.types";

type TProps = {
  modalVisible: boolean;
  editingFaculty: Partial<TFaculty> | null;
  setEditingFaculty: React.Dispatch<
    React.SetStateAction<Partial<TFaculty> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FacultyModal = ({
  modalVisible,
  setModalVisible,
  editingFaculty,
  setEditingFaculty,
}: TProps) => {
  const [form] = Form.useForm();
  const [selectedAcademicDepartment, setSelectedAcademicDepartment] = useState<
    string | null
  >(null);
  const { data: academicDepartments, isLoading: isLoadingAcademicDepartments } =
    useGetAllAcademicDepartmentQuery([]);

  const [createFaculty, { isLoading: isLoadingCreateFaculty }] =
    useInsertFacultyMutation();
  const [updateFaculty, { isLoading: isLoadingUpdateFaculty }] =
    useUpdateFacultyMutation();

  useEffect(() => {
    if (editingFaculty) {
      form.setFieldsValue({
        ...editingFaculty,
        academicDepartment: editingFaculty.academicDepartment?._id,
        name: {
          firstName: editingFaculty.name?.firstName,
          middleName: editingFaculty.name?.middleName,
          lastName: editingFaculty.name?.lastName,
        },
      });
    }
  }, [form, editingFaculty]);

  const handleCreateFaculty = async (values: Partial<TFaculty>) => {
    try {
      const result = (await createFaculty(
        values
      ).unwrap()) as TResponse<TFaculty>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to add faculty");
    } finally {
      setEditingFaculty(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateFaculty = async (values: Partial<TFaculty>) => {
    try {
      const res = (await updateFaculty({
        ...values,
        _id: editingFaculty?._id,
      }).unwrap()) as TResponse<TFaculty>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || "Failed to update faculty"
      );
    } finally {
      setEditingFaculty(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={modalVisible}
      onCancel={() => {
        form.resetFields();
        setEditingFaculty(null);
        setModalVisible(false);
      }}
      width={1000}
      className="p-6 bg-white rounded-lg my-scrollbar max-h-[80vh] overflow-y-scroll"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingFaculty ? "Update Faculty" : "Add Faculty"}
      </h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={editingFaculty ? handleUpdateFaculty : handleCreateFaculty}
      >
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          {/* Name */}
          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["name", "firstName"]}
              rules={[{ required: true, message: "Please input first name!" }]}
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
              rules={[{ required: true, message: "Please input last name!" }]}
              label="Last Name"
              placeholder="Enter last name"
              type="text"
              size="large"
            />
          </div>
          {/* Gender, DOB, BG */}
          <div className="flex flex-wrap gap-4">
            <MyInp
              name="gender"
              rules={[{ required: true, message: "Please select gender!" }]}
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
              rules={[
                { required: true, message: "Please select date of birth!" },
              ]}
              label="Date of Birth"
              placeholder="Select date of birth"
              type="date"
              size="large"
            />
            <MyInp
              name="bloodGroup"
              label="Blood Group"
              placeholder="Enter blood group"
              rules={[
                { required: true, message: "Please select blood group!" },
              ]}
              type="select"
              size="large"
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (elem) => ({ value: elem, label: elem })
              )}
            />
          </div>
          {/* Email, phone */}
          <div className="flex flex-wrap gap-4">
            <MyInp
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Please input a valid email!" },
              ]}
              label="Email"
              placeholder="Enter email"
              type="email"
              size="large"
            />
            <MyInp
              name="phone"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
              label="Phone"
              placeholder="Enter phone number"
              type="text"
              size="large"
            />
            {!editingFaculty && (
              <MyInp
                name="password"
                rules={[{ required: true, message: "Please input password!" }]}
                label="Password"
                placeholder="Enter password"
                type="password"
                size="large"
              />
            )}
          </div>
          {/* NID, PreAdd, PerAdd */}
          <div className="flex flex-wrap gap-4">
            <MyInp
              name="nid"
              rules={[{ required: true, message: "Please input national ID!" }]}
              label="National ID"
              placeholder="Enter national ID"
              type="text"
              size="large"
            />
            <MyInp
              name="presentAddress"
              rules={[
                { required: true, message: "Please input present address!" },
              ]}
              label="Present Address"
              placeholder="Enter present address"
              type="text"
              size="large"
            />
            <MyInp
              name="permanentAddress"
              rules={[
                { required: true, message: "Please input permanent address!" },
              ]}
              label="Permanent Address"
              placeholder="Enter permanent address"
              type="text"
              size="large"
            />
          </div>
          {/* Profile Image */}
          <MyInp
            name="profileImg"
            label="Profile Image URL"
            placeholder="Enter profile image URL"
            type="text"
            size="large"
          />
        </div>

        {/* Guardian Information */}
        {/* Optional: You can include guardian information if necessary */}

        {/* Academic Information */}
        {isLoadingAcademicDepartments ? (
          <Skeleton active className="!my-2" />
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-2 mt-6">
              Academic Information
            </h3>
            <div className="flex flex-wrap gap-4">
              <Form.Item
                name="academicDepartment"
                label="Department"
                rules={[
                  { required: true, message: "Please select a department!" },
                ]}
                className="flex-1"
              >
                <Select
                  placeholder="Select department"
                  size="large"
                  value={selectedAcademicDepartment}
                  disabled={editingFaculty ? true : false}
                  onChange={(value) => setSelectedAcademicDepartment(value)}
                  options={academicDepartments?.data?.map(
                    (item: TAcademicDepartment) => ({
                      value: item?._id,
                      label: item?.name,
                    })
                  )}
                />
              </Form.Item>
              <MyInp
                name="designation"
                rules={[
                  { required: true, message: "Please input designation!" },
                ]}
                label="Designation"
                placeholder="Enter designation"
                type="text"
                size="large"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingCreateFaculty || isLoadingUpdateFaculty}
          >
            {editingFaculty ? "Update Faculty" : "Add Faculty"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FacultyModal;
