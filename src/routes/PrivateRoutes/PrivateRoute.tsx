import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";

// TODO: Private route to make specific protected route by role
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={"/"} replace />; //TODO back to location history
  }

  return children;
};

export default PrivateRoute;
