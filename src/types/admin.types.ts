import { TUser } from "./index.type";
import { TName } from "./student.types";

export type TAdmin = {
  _id: string;
  id: string;
  user: TUser;
  designation: string;
  name: TName;
  profileImg: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  nid: string;
  bloodGroup: string;
  isDeleted: boolean;
};
