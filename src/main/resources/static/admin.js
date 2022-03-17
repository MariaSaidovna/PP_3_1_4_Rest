getAllUsers();
function getAllUsers() {
    let tBody = document.getElementById("tBody");
    tBody.innerHTML = "";
    fetch('http://localhost:8080/admin/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                let row = tBody.insertRow();
                row.setAttribute("id", user.id);
                let cell0 = row.insertCell();
                cell0.innerHTML = user.id;
                let cell1 = row.insertCell();
                cell1.innerHTML = user.username;
                let cell11 = row.insertCell();
                cell11.innerHTML = user.name;
                let cell2 = row.insertCell();
                cell2.innerHTML = user.lastname;
                let cell3 = row.insertCell();
                cell3.innerHTML = user.email;
                let cell5 = row.insertCell();
                cell5.innerHTML = user.roles.map(role => role.role === 'ROLE_USER' ? 'USER' : 'ADMIN');
                let cell6 = row.insertCell();
                cell6.innerHTML =
                    '<button type="button" onclick="getModalEdit(' + user.id + ')" '
                    + 'class="btn btn-info">Edit</button>';
                let cell7 = row.insertCell();
                cell7.innerHTML =
                    '<button type="button" onclick="getModalDelete(' + user.id + ')" '
                    + 'class="btn btn-danger">Delete</button>';
            })
        });
}


