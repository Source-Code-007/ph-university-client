import { TBloodGroup, TRole } from "../types/index.type";

export const role = {
  STUDENT: "student" as TRole,
  FACULTY: "faculty" as TRole,
  ADMIN: "admin" as TRole,
};

export const bloodGroup: Record<TBloodGroup, string> = {
  "A+": "A+",
  "A-": "A-",
  "B+": "B+",
  "B-": "B-",
  "AB+": "AB+",
  "AB-": "AB-",
  "O+": "O+",
  "O-": "O-",
};
