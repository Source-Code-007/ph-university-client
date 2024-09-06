import { TAcademicDepartment } from "./academicDepartment.types";

export type TBatch = {
  _id: string;
  batch: number;
  department: TAcademicDepartment;
  totalStudent: number;
  createdAt: string;
  updatedAt: string;
};
