'use client'
import React, { useState } from "react"
type Props = {
    name: string,
    age: string;
    onChangeName: (value: string) => void;
    onChangeAge: (value: string) => void;
    onSubmit: () => void;
    isEditing: boolean;
};


export default function StudentForm({ name, age, onChangeName, onChangeAge, onSubmit, isEditing }: Props) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4 p-4 border rounded shadow">
            <div>
                <label>Họ tên:</label>
                <input type="text"
                    value={name}
                    onChange={e => onChangeName(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required placeholder="Họ tên"
                    autoFocus>
                </input>
            </div>
            <div>
                <label>Tuổi</label>
                <input type="number" value={age}
                    onChange={e => onChangeAge(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required
                    placeholder="Tuổi"></input>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bh-blue-700"
            >{isEditing ? "Sửa thông tin" : "Thêm mới"}</button>
        </form>
    );
};