// Cấu hình môi trường và kết nối cơ sở dữ liệu
require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const database = require("./config/database");
database.connect();

// Khởi tạo các middleware cần thiết
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require('cors');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require('express-session');

// Middleware cơ bản
app.use(methodOverride('_method')); // Cho phép sử dụng các phương thức HTTP khác ngoài GET và POST
app.use(bodyParser.urlencoded({ extended: false })); // Phân tích dữ liệu form gửi lên
app.use(express.static(`${__dirname}/public`)); // Phục vụ các file tĩnh từ thư mục 'public'
app.use(cors()); // Cho phép CORS

// Middleware cho quản lý phiên làm việc (Session) và Flash messages
app.use(cookieParser("ASDHIASHDJAS")); // Xử lý cookie với khóa bí mật
app.use(session({ cookie: { maxAge: 60000 } })); // Quản lý phiên làm việc với thời gian sống của cookie
app.use(flash()); // Xử lý các thông báo flash

// Cấu hình các thư viện và định tuyến
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set("views", `${__dirname}/views`); // Thiết lập thư mục chứa các template views
app.set("view engine", "pug"); // Thiết lập pug làm engine template

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce'))); // Cấu hình phục vụ TinyMCE

// Định tuyến
routeAdmin(app); // Đăng ký các route cho admin

// API Route (Ví dụ)
app.get('/api/message', (req, res) => {
  res.json({ message: 'Dữ liệu được gửi từ backend!' }); // Ví dụ về một API route
});

// Khởi động server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
