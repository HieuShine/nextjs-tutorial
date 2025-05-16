'use client';
import { useState, useEffect } from "react";
import StudentCard from "./Components/StudentCard";
import StudentForm from "./Components/StudentForm";

export default function Home() {
  const [students, setStudent] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  //state để lưu dữ liệu form
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [edittingId, setEditingId] = useState<number | null>(null);


  //UseEfect  get student rom localStorage
  // useEffect(() => {
  //   const savedStudents = localStorage.getItem('students');
  //   if (savedStudents) {
  //     setStudent(JSON.parse(savedStudents));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('students', JSON.stringify(students));
  // }, [students]);

  //useEfect get student from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log('start')
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log('response: ', response)
        const data = await response.json();
        console.log('data:', data);

        //chuyển dât API thành dạng props Student
        const studentList = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          age: Math.floor(Math.random() * 10) + 18, //random()
        }))
        //set studentlist
        setStudent(studentList);
        setLoading(false);
      }
      catch (er) {
        console.log('Lỗi khi call API', er);
        setLoading(false);
      }
    }
    fetchStudents();

  }, []);


  //Hàm thêm sinh viên mới
  const handleDeleteStudent = (id: number) => {
    setStudent(students.filter(x => x.id !== id));

  };

  const handleSaveStudent = () => {
    console.log('editingId:', edittingId);
    if (!name || !age) return alert('Vui lòng nhập đầy đủ tên và tuổi');
    if (edittingId !== null) {
      const updated = students.map(st => st.id === edittingId ? { ...st, name, age: Number(age) } : st);
      setStudent(updated);
      setEditingId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        age: Number(age)
      };
      setStudent([...students, newStudent]);
    }
    //reset form
    setName('');
    setAge('');

  }

  const handleEditStudent = (student: { id: number; name: any; age: any; }) => {
    setName(student.name);
    setAge(student.age);
    setEditingId(student.id)
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Form thêm sinh viên */}
      <StudentForm
        name={name}
        age={age}
        onChangeName={setName}
        onChangeAge={setAge}
        onSubmit={handleSaveStudent}
        isEditing={edittingId !== null}
      />

      <h1 className="mt-10 mb-4">Danh sách sinh viên (Dữ liệu từ API)</h1>

      {loading ? (
        <p>Đang tải dữ liệu.....</p>
      ) : (
        <table className="table-fixed w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className=" max-w-[20px] text-center">STT</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Tuổi</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* Hiển thị danh sách sinh viên */}
            {students.map((student, index) => (
              <StudentCard
                key={student.id}
                index={index}
                student={student}
                onEdit={() => handleEditStudent(student)}
                onDelete={() => handleDeleteStudent(student.id)}
              />
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}