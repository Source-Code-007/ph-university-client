import { Button, Skeleton } from "antd";
import {
  useGetAcademicDepartmentQuery,
  useInsertAcademicDepartmentMutation,
} from "../../../redux/features/admin/academicManagementApi";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const AcademicDepartment = () => {
  const { data: academicDepartment, isLoading: isLoadingAcademicDepartment } =
    useGetAcademicDepartmentQuery(null);
  const [
    insertAcademicDepartment,
    { isLoading: isLoadingCreateAcademicDepartment },
  ] = useInsertAcademicDepartmentMutation();

  console.log(academicDepartment, "academicDepartment");

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2>Academic department</h2>
        <Button type="primary">Add academic dept</Button>
      </div>

      {isLoadingAcademicDepartment ? (
        <Skeleton active />
      ) : !academicDepartment?.data?.length ? (
        <h2>No academic dept found!</h2>
      ) : (
        academicDepartment?.data?.map((item: any, ind: number) => (
          <div
            key={ind}
            className="flex justify-between items-center border-b py-3"
          >
            <div>{item.name}</div>
            <div className="flex gap-2">
              <Button type="primary">
                <EditFilled /> Edit
              </Button>
              <Button type="default">
                <DeleteFilled /> Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AcademicDepartment;
