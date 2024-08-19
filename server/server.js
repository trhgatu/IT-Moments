require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require("./config/system");
const database = require("./config/database");
database.connect();
const port = process.env.PORT;
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
//Route
routeAdmin(app);

// Enable CORS to allow requests from the frontend
app.use(cors());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Dữ liệu được gửi từ backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
