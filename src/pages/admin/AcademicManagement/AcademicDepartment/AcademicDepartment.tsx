import { useGetAcademicDepartmentQuery } from "../../../../redux/features/academicDepartment/academicDepartmentApi";

const AcademicDepartment = () => {
  const { data: academicDepartment, isLoading: isLoadingAcademicDepartment } =
    useGetAcademicDepartmentQuery(null);

  console.log(academicDepartment, "academicDepartment");

  return <div>Academic department</div>;
};

export default AcademicDepartment;
