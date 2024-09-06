import { Button, Form, message, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import {
  useGetAllCourseQuery,
  useInsertCourseMutation,
  useUpdateCourseMutation,
} from "../../../redux/features/admin/courseApi";
import { TCourse } from "../../../types/course.types";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";

type TProps = {
  open: boolean;
  editingCourse: Partial<TCourse> | null;
  setEditingCourse: React.Dispatch<
    React.SetStateAction<Partial<TCourse> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CourseModal = ({
  open,
  setModalVisible,
  editingCourse,
  setEditingCourse,
}: TProps) => {
  const [form] = Form.useForm();
  const { data: course, isLoading: isLoadingCourse } = useGetAllCourseQuery([]);
  const [createCourse, { isLoading: isLoadingCreateCourse }] =
    useInsertCourseMutation();
  const [updateCourse, { isLoading: isLoadingUpdateCourse }] =
    useUpdateCourseMutation();

  useEffect(() => {
    if (editingCourse) {
      form.setFieldsValue({
        ...editingCourse,
        preRequisiteCourse: editingCourse?.preRequisiteCourses?.map(
          (course: { isDeleted: boolean; course: TCourse }) => ({
            label: course?.course?.title,
            value: course?.course?._id,
          })
        ),
      });
    }
  }, [form, editingCourse]);

  const handleCreateCourse = async (values: TCourse) => {
    const modifiedPrerequisiteCourse = values.preRequisiteCourses?.map(
      (course) => ({
        course,
      })
    );
    const modifiedPayload = {
      ...values,
      preRequisiteCourses: modifiedPrerequisiteCourse,
      code: Number(values.code),
      credit: Number(values.credit),
    };
    try {
      const result = (await createCourse(
        modifiedPayload
      ).unwrap()) as TResponse<TCourse>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setEditingCourse(null);
      setModalVisible(false);
      form.resetFields();
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to add course");
    }
  };

  const handleUpdateCourse = async (values: Partial<TCourse>) => {
    // TODO: handle preRequisitecourse
    try {
      const res = (await updateCourse({
        ...values,
        _id: editingCourse?._id,
      }).unwrap()) as TResponse<TCourse>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
      setEditingCourse(null);
      setModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || "Failed to update course"
      );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setEditingCourse(null);
        setModalVisible(false);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingCourse ? "Update course" : "Add course"}
      </h2>
      {isLoadingCourse ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={editingCourse ? handleUpdateCourse : handleCreateCourse}
        >
          {/* course name */}
          <MyInp
            name="title"
            rules={[
              {
                required: true,
                message: "Please input course name!",
              },
            ]}
            label="Course Name"
            placeholder="Course name"
            type="text"
            size="large"
          />
          <MyInp
            name="prefix"
            rules={[
              {
                required: true,
                message: "Please input course prefix!",
              },
            ]}
            label="Course Prefix"
            placeholder="Enter short name for course"
            type="text"
            size="large"
          />
          <MyInp
            name="code"
            rules={[
              {
                required: true,
                message: "Please input code of course!",
              },
            ]}
            label="Course Code"
            placeholder="Enter course code"
            type="text"
            size="large"
            disabled={editingCourse ? true : false}
          />
          <MyInp
            name="credit"
            rules={[
              {
                required: true,
                message: "Please input course credit!",
              },
            ]}
            label="Course Credit"
            placeholder="Enter course credit"
            type="text"
            size="large"
            disabled={editingCourse ? true : false}
          />
          <MyInp
            name="preRequisiteCourses"
            label="Prerequisite Courses"
            placeholder="Select multiple prerequisite course"
            type="select"
            size="large"
            mode="multiple"
            options={course?.data?.map((item: TCourse) => ({
              value: item?._id,
              label: <span>{item?.title}</span>,
            }))}
          />

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              loading={
                isLoadingCourse ||
                isLoadingCreateCourse ||
                isLoadingUpdateCourse
              }
              htmlType="submit"
              block
              size="large"
            >
              {editingCourse ? "Update course" : "Insert course"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default CourseModal;
