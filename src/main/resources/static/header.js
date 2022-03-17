fetch('http://localhost:8080/api/user')
    .then(response => response.json())
    .then(user => {
        document.getElementById("headerName").innerHTML = user.name;
        document.getElementById("headerRoles").innerHTML = user.roles.map(role => role.role === 'ROLE_USER' ? 'USER' : 'ADMIN');
    });