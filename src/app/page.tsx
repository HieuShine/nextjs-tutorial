'use client';
import { useState } from "react";

import StudentCard from "./Components/StudentCard";
export default function Home() {
  const [students, setStudent] = useState([
    { id: 1, name: 'Nguyễn Văn A', age: 20 },
    { id: 2, name: 'Nguyễn Văn B', age: 21 },
  ]);


  //state để lưu dữ liệu form
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [edittingId, setEditingId] = useState<number | null>(null);

  //Hàm thêm sinh viên mới

  const handleCreateStudent = () => {
    if (!name || !age) return alert('Vui lòng nhập đầy đủ tên và tuổi');
    const newStudent = {
      id: Date.now(),
      name,
      age: Number(age)

    };
    setStudent([...students, newStudent]);
    //reset form
    setName('');
    setAge('');

  }
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
      <h1>Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Tên sinh viên"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={e => setAge(e.target.value)}
          style={{ marginRight: '1rem', width: '80px' }}
        />
        <button onClick={handleSaveStudent}>Thêm sinh viên</button>
      </div>

      {/* Hiển thị danh sách sinh viên */}
      {students.map(student => (
        <StudentCard
          key={student.id}
          name={student.name}
          age={student.age}
          onDelete={() => handleDeleteStudent(student.id)} onEdit={() => handleEditStudent(student)}
        />
      ))}
    </div>
  );
}