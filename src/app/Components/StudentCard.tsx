


export default function StudentCard({ index, student, onEdit, onDelete }: StudentCardProps) {
  return (
    <tr className="border-t">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2">{student.name}</td>
      <td className="p-2 text-center">{student.age}</td>
      <td className="p-2 space-x-2 text-center">
        <button onClick={onEdit} className="bg-green-500 text-white px-2 py-1 rounded">Sửa</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
      </td>
    </tr>
  );
}
