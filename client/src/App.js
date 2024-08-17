import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  // Gọi API khi component được render lần đầu tiên
  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);  // Lưu thông điệp từ API vào state
      })
      .catch(error => console.error('Error fetching message:', error));
  }, []);  // Mảng rỗng để useEffect chỉ chạy 1 lần khi component được mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>  {/* Hiển thị thông điệp từ backend */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
