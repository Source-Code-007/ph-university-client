import { Button, Form, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import MyInp from "../../../ui/Form/MyInp";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagementApi";
import { TResponse } from "../../../../types/index.type";
import { TAdmin } from "../../../../types/admin.types";
import {
  useInsertAdminMutation,
  useUpdateAdminMutation,
} from "../../../../redux/features/admin/userManagementApi";

type TProps = {
  modalVisible: boolean;
  editingAdmin: Partial<TAdmin> | null;
  setEditingAdmin: React.Dispatch<React.SetStateAction<Partial<TAdmin> | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminModal = ({
  modalVisible,
  setModalVisible,
  editingAdmin,
  setEditingAdmin,
}: TProps) => {
  const [form] = Form.useForm();
  const [createAdmin, { isLoading: isLoadingCreateAdmin }] =
    useInsertAdminMutation();
  const [updateAdmin, { isLoading: isLoadingUpdateAdmin }] =
    useUpdateAdminMutation();

  useEffect(() => {
    if (editingAdmin) {
      form.setFieldsValue({
        ...editingAdmin,
        name: {
          firstName: editingAdmin.name?.firstName,
          middleName: editingAdmin.name?.middleName,
          lastName: editingAdmin.name?.lastName,
        },
      });
    }
  }, [form, editingAdmin]);

  const handleCreateAdmin = async (values: Partial<TAdmin>) => {
    try {
      const result = (await createAdmin(values).unwrap()) as TResponse<TAdmin>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to add admin");
    } finally {
      setEditingAdmin(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateAdmin = async (values: Partial<TAdmin>) => {
    try {
      const res = (await updateAdmin({
        ...values,
        _id: editingAdmin?._id,
      }).unwrap()) as TResponse<TAdmin>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || "Failed to update admin"
      );
    } finally {
      setEditingAdmin(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={modalVisible}
      onCancel={() => {
        form.resetFields();
        setEditingAdmin(null);
        setModalVisible(false);
      }}
      width={1000}
      className="p-6 bg-white rounded-lg my-scrollbar max-h-[80vh] overflow-y-scroll"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingAdmin ? "Update Admin" : "Add Admin"}
      </h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={editingAdmin ? handleUpdateAdmin : handleCreateAdmin}
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
              disabled={editingAdmin ? true : false}
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
              disabled={editingAdmin ? true : false}
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
              disabled={editingAdmin ? true : false}
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
            {!editingAdmin && (
              <MyInp
                name="password"
                defaultValue="1234@@aA"
                label="Password"
                placeholder="Enter password"
                type="text"
                disabled
                prefix="🔒"
                size="large"
              />
            )}
          </div>
          {/* NID, PreAdd, PerAdd */}
          <div className="flex flex-wrap gap-4">
            <MyInp
              name="nid"
              disabled={editingAdmin ? true : false}
              rules={[{ required: true, message: "Please input national ID!" }]}
              label="National ID"
              placeholder="Enter national ID"
              type="text"
              size="large"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingCreateAdmin || isLoadingUpdateAdmin}
          >
            {editingAdmin ? "Update Admin" : "Add Admin"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AdminModal;
