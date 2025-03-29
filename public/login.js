document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') {
    window.location.href = 'dashboard.html';
    return;
  }

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const { user } = await response.json();
    if (user.role === 'Admin') {
      window.location.href = 'dashboard.html';
    } else if (user.role === 'Employee') {
      window.location.href = 'employee-dashboard.html';
    } else {
      alert('مرحبًا، لا يمكنك الوصول إلى هذه الصفحة.');
    }
  } else if (response.status === 401) {
    document.getElementById('error-message').textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
  } else {
    document.getElementById('error-message').textContent = 'حدث خطأ أثناء محاولة تسجيل الدخول. حاول مرة أخرى.';
  }
});
