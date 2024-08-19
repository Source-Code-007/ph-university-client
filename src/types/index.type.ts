import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarRoute = {
  key: string;
  label: ReactNode;
  children?: TSidebarRoute[];
};

export type TRoutes = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutes[];
};

export type TRole = "student" | "faculty" | "admin";

export type TDecodedUser = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};

export type TMeta = {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
};
export type TResponse = {
  success: boolean;
  message: string;
  data?: any;
  meta?: TMeta;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
