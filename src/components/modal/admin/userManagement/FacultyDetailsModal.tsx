import { Modal } from "antd";
import React from "react";
import moment from "moment";
import { TFaculty } from "../../../../types/faculty.types"; // Adjust this import based on your actual types

type TProps = {
  detailsModalVisible: boolean;
  editingFaculty: Partial<TFaculty> | null;
  setEditingFaculty: React.Dispatch<
    React.SetStateAction<Partial<TFaculty> | null>
  >;
  setDetailsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FacultyDetailsModal = ({
  detailsModalVisible,
  setDetailsModalVisible,
  editingFaculty,
  setEditingFaculty,
}: TProps) => {
  if (!editingFaculty) {
    return null; // Return null if no faculty data is provided
  }

  const {
    name,
    profileImg,
    gender,
    dateOfBirth,
    email,
    phone,
    nid,
    presentAddress,
    permanentAddress,
    designation,
    academicDepartment,
  } = editingFaculty;

  return (
    <Modal
      open={detailsModalVisible}
      onCancel={() => {
        setEditingFaculty(null);
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
          <p className="text-gray-600">Designation: {designation}</p>
          <p className="text-gray-600">
            Department: {academicDepartment?.name}
          </p>
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
          <div>
            <strong className="block text-gray-800">Present Address:</strong>
            <p className="text-gray-600">{presentAddress}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Permanent Address:</strong>
            <p className="text-gray-600">{permanentAddress}</p>
          </div>
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="mb-6">
        <h4 className="text-2xl font-semibold mb-4">Academic Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong className="block text-gray-800">Department:</strong>
            <p className="text-gray-600">{academicDepartment?.name}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Academic Faculty:</strong>
            <p className="text-gray-600">
              {academicDepartment?.academicFaculty?.name}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FacultyDetailsModal;
