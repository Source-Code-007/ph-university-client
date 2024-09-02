import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { TDecodedUser, TRole } from "../../types/index.type";
import verifyJwtToken from "../../utils/verifyJwtToken";

// TODO: Private route to make specific protected route by role
const PrivateRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: TRole;
}) => {
  const { token } = useAppSelector((state) => state.auth);

  let user;
  if (token) {
    user = verifyJwtToken(token) as TDecodedUser;
  }

  if (user?.role != role) {
    return <Navigate to={"/signin"} replace />; //TODO back to location history
  }
  if (!token) {
    return <Navigate to={"/signin"} replace />; //TODO back to location history
  }

  return children;
};

export default PrivateRoute;
