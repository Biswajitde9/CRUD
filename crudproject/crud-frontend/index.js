const createUser = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
  
    const response = await fetch('http://localhost:5000/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, gender, active: true }),
    });
  
    if (response.ok) {
      // Clear form fields and update users list
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('gender').value = 'male';
      getUsers();
    } else {
      console.error('Error creating user');
    }
  };
  
  const getUsers = async () => {
    const response = await fetch('http://localhost:5000/api/v1/users');
    const data = await response.json();
    const usersList = document.getElementById('users');
  
    usersList.innerHTML = '';
  
    data.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `${user.name} (${user.gender}) - <a href="#" onclick="deleteUser('${user._id}')">Delete</a>`;
      usersList.appendChild(li);
    });
  };
  
  const deleteUser = async (userId) => {
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      getUsers();
    } else {
      console.error('Error deleting user');
    }
  };
  
  getUsers();
  