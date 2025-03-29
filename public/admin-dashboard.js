document.getElementById('add-employee-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const employeeName = document.getElementById('employee-name').value;
  const employeeUsername = document.getElementById('employee-username').value;
  const employeePassword = document.getElementById('employee-password').value;

  const response = await fetch('/add-employee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: employeeName, username: employeeUsername, password: employeePassword })
  });

  if (response.ok) {
    const employee = await response.json();
    const table = document.getElementById('employee-table');
    const row = table.insertRow();
    row.insertCell(0).textContent = employee.name;
    row.insertCell(1).textContent = employee.username;
    alert('تم إضافة الموظف بنجاح.');
  } else {
    alert('حدث خطأ أثناء إضافة الموظف. حاول مرة أخرى.');
  }
});
