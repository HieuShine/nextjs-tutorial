type Student = {
  id: number;
  name: string;
  age: number;
};
//1. Tạo type riêng cho StudentCardProps:
type StudentCardProps = {
  index: number;
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
};