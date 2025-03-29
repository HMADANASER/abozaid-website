const express = require('express');
const path = require('path'); // تأكد من استيراد مكتبة path
const app = express();
app.use(express.json());

const employees = []; // تخزين بيانات الموظفين مؤقتًا

app.post('/add-employee', (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).send('جميع الحقول مطلوبة.');
  }
  const employeeExists = employees.some(emp => emp.username === username);
  if (employeeExists) {
    return res.status(400).send('اسم المستخدم موجود بالفعل.');
  }
  const employee = { name, username, password };
  employees.push(employee);
  res.status(201).json(employee);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.json({ user: { role: 'Admin' } });
  }
  const employee = employees.find(emp => emp.username === username && emp.password === password);
  if (employee) {
    return res.json({ user: { role: 'Employee' } });
  }
  res.status(401).send('بيانات الدخول غير صحيحة.');
});

// صفحة حماده
app.get('/hmada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'employee-dashboard.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});