const express = require('express');
const open = require('open');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let employees = [
  {
    fullName: "Admin User",
    email: "admin@example.com",
    jobTitle: "Administrator",
    department: "Management",
    username: "admin",
    password: "admin123",
    role: "Admin"
  }
];

// API لتسجيل الدخول
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = employees.find(emp => emp.username === username && emp.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// API لإدارة الموظفين (إضافة، تعديل، حذف)
app.get('/employees', (req, res) => res.json(employees));
app.post('/employees', (req, res) => {
  employees.push(req.body);
  res.json({ success: true });
});
app.put('/employees/:username', (req, res) => {
  const index = employees.findIndex(emp => emp.username === req.params.username);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});
app.delete('/employees/:username', (req, res) => {
  employees = employees.filter(emp => emp.username !== req.params.username);
  res.json({ success: true });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
