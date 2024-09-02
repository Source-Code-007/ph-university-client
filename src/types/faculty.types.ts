import { TAcademicDepartment } from "./academicDepartment.types";
import { TUser } from "./index.type";
import { TName } from "./student.types";

export type TFaculty = {
  _id: string;
  id: string;
  user: TUser;
  academicDepartment: TAcademicDepartment;
  designation: string;
  name: TName;
  profileImg: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  nid: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  isDeleted: boolean;
};
