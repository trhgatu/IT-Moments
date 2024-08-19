const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS to allow requests from the frontend
app.use(cors());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Dữ liệu được gửi từ backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
