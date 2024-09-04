import { Modal } from "antd";
import React from "react";
import moment from "moment";
import { TAdmin } from "../../../../types/admin.types"; // Adjust this import based on your actual types

type TProps = {
  detailsModalVisible: boolean;
  editingAdmin: Partial<TAdmin> | null;
  setEditingAdmin: React.Dispatch<
    React.SetStateAction<Partial<TAdmin> | null>
  >;
  setDetailsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminDetailsModal = ({
  detailsModalVisible,
  setDetailsModalVisible,
  editingAdmin,
  setEditingAdmin,
}: TProps) => {
  if (!editingAdmin) {
    return null; // Return null if no admin data is provided
  }

  const {
    name,
    profileImg,
    gender,
    dateOfBirth,
    email,
    phone,
    nid,
    bloodGroup,
  } = editingAdmin;

  return (
    <Modal
      open={detailsModalVisible}
      onCancel={() => {
        setEditingAdmin(null);
        setDetailsModalVisible(false);
      }}
      className="p-6 bg-white rounded-lg my-scrollbar max-h-[80vh] overflow-y-scroll"
      width={1000}
      footer={null}
    >
      <div className="flex items-center mb-6">
        <img
          src={
            profileImg ||
            "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {name?.firstName} {name?.middleName} {name?.lastName}
          </h3>
          <p className="text-gray-600">Gender: {gender}</p>
          <p className="text-gray-600">
            Date of Birth: {moment(dateOfBirth).format("DD-MM-YYYY")}
          </p>
          <p className="text-gray-600">Blood Group: {bloodGroup}</p>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="mb-6">
        <h4 className="text-2xl font-semibold mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong className="block text-gray-800">Email:</strong>
            <p className="text-gray-600">{email}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Phone:</strong>
            <p className="text-gray-600">{phone}</p>
          </div>
          <div>
            <strong className="block text-gray-800">NID:</strong>
            <p className="text-gray-600">{nid}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminDetailsModal;
