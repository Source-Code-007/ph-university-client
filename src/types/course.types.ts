export type TPreRequisiteCourse = {
  isDeleted: boolean;
  course: TCourse;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credit: number;
  isDeleted: boolean;
  preRequisiteCourses: TPreRequisiteCourse[];
  __v: number;
};
