export class BaseOrderResponseDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  sum: number;
  alreadyPaid: number;
  created_at: Date;
  utm: string;
  msg: string;
  status: string;
  group: string;
  manager: string;
}
