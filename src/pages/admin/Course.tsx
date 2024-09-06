import { Button, Empty, message, Popconfirm, Skeleton, Table } from "antd";

import { useState } from "react";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "../../redux/features/admin/courseApi";
import { TCourse, TPreRequisiteCourse } from "../../types/course.types";
import CourseModal from "../../components/modal/admin/CourseModal";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { TResponse } from "../../types/index.type";

const Course = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<Partial<TCourse> | null>(
    null
  );
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );
  const [deleteCourse] = useDeleteCourseMutation();
  const {
    data: course,
    isLoading: isLoadingCourse,
    isFetching: isFetchingCourse,
  } = useGetAllCourseQuery([
    { name: "isDeleted", value: "false" },
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
  ]);

  const columns = [
    {
      key: "index",
      title: "#",
      render: (_: TCourse, __: TCourse, index: number) => index + 1,
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Prefix",
      key: "prefix",
      dataIndex: "prefix",
    },
    {
      title: "Credit",
      key: "credit",
      dataIndex: "credit",
    },
    {
      title: "Code",
      key: "Code",
      dataIndex: "code",
    },
    {
      title: "Prerequisite courses",
      key: "preRequisiteCourses",
      dataIndex: "preRequisiteCourses",
      render: (prerequisiteCourses: TPreRequisiteCourse[]) => {
        if (!prerequisiteCourses?.length) {
          return null;
        }
        return prerequisiteCourses?.map((course, ind) => {
          return (
            <div>
              {ind + 1}. {course?.course?.title}
            </div>
          );
        });
      },
    },
    {
      title: "Actions",
      render: (_: TCourse, record: TCourse) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingCourse(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the course"
              description="Are you sure to delete this course?"
              onConfirm={() => handleDeleteCourse(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record._id}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteCourse = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteCourse(id).unwrap()) as TResponse<TCourse>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete course"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };
  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4 flex-wrap">
        <h2 className="font-bold text-xl md:text-2xl">Course</h2>

        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add course
        </Button>
      </div>

      {isLoadingCourse ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : course?.meta?.total === 0 ? (
        <Empty description="No course found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={course?.data}
          loading={isLoadingCourse || isFetchingCourse}
          scroll={{ x: 800 }}
          pagination={{
            position: ["bottomCenter"],
            total: course?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Create academic department modal*/}
      <CourseModal
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
        open={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default Course;
