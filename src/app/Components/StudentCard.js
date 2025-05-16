export default function StudentCard({ name, age, onDelete,onEdit }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3>{name}</h3>
        <p>Tuổi: {age}</p>
      </div>
      <div>
        
      <button onClick={onEdit} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Sửa
      </button>
      <button onClick={onDelete} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Xóa
      </button>
      </div>
    </div>
  );
}