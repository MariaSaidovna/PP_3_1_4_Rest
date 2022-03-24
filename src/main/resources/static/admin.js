/*getAllUsers();
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
}*/

const renderUsers = (users) => {
    output = '',
        users.forEach(user => {
            output += ` 
              <tr> 
                    <td>${user.id}</td> 
                    <td>${user.username}</td> 
                    <td>${user.name}</td> 
                    <td>${user.lastname}</td>
                    <td>${user.email}</td> 
                    <td>${user.roles.map(role => role.role === 'ROLE_USER' ? 'USER' : 'ADMIN')}</td> 
              <td> 
                   <button type="button" onclick="getModalEdit(${user.id})" 
                    data-id="${user.id}" class="btn btn-info">Edit</button>
               </td> 
               <td> 
                   <button type="button" onclick="getModalDelete(${user.id})" 
                   data-id="${user.id}" class="btn btn-danger">Delete</button> 
                    </td> 
              </tr>`
        })
    info.innerHTML = output;
}

const info = document.querySelector('#tBody');

let users = [];
const updateUser = (user) => {
    const foundIndex = users.findIndex(x => x.id == user.id);
    users[foundIndex] = user;
    renderUsers(users);
    console.log('usersChanged');
}
const removeUser = (id) => {
    users = users.filter(user => user.id != id);
    console.log(users)
    renderUsers(users);
}

// GET ALL users
fetch('http://localhost:8080/admin/users')
    .then(res => res.json())
    .then(data => {
        users = data;
        renderUsers(data)
    })

// EDIT user
function getModalEdit(id) {
    fetch('http://localhost:8080/admin/users/' + id)
        .then(response => response.json())
        .then(user => {

            console.log(user)


            $("#modalEdit").modal()

            const userInff = document.getElementById("eId")
            let ans = user.id
            console.log(ans)
            let two = user.username
            console.log(two)

            document.getElementById("eId").value = user.id
            document.getElementById("eUsername").value = user.username
            document.getElementById("ePassword").value = user.password
            document.getElementById("eName").value = user.name
            document.getElementById("eLastname").value = user.lastname
            document.getElementById("eEmail").value = user.email


            $('#eRoles').empty()
            let rolesList1 = ["ROLE_ADMIN", "ROLE_USER"]
            console.log(rolesList1)

            let userRoles = ''
            user.roles.forEach(role => {
                userRoles += role.role
            })

            rolesList1.forEach(function (value) {
                if (userRoles.includes(value)) {
                    $('#eRoles').append('<option id="option"' + value + ' value="' + value + '" selected>' + value + '</option>')
                } else {
                    $('#eRoles').append('<option id="option"' + value + ' value="' + value + '">' + value + '</option>')
                }
            })

        })
}

function editUser() {
    let form = window.formEditUser.eRoles;
    let id = window.formEditUser.eId.value;
    let newRoles = [];
    let rolesList = document.createElement('ul');

    for (let i = 0; i < form.length; i++) {
        let option = form.options[i];
        if (option.selected) {
            newRoles.push(option.value)
        }
    }

    fetch('http://localhost:8080/admin/update?currentRoles=' + newRoles, {
        method: 'PUT',
        body: JSON.stringify({
            id: window.formEditUser.eId.value,
            username: window.formEditUser.eUsername.value,
            password: window.formEditUser.ePassword.value,
            name: window.formEditUser.eName.value,
            lastname: window.formEditUser.eLastname.value,
            email: window.formEditUser.eEmail.value,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(res => res.json()).then(data => updateUser(data))
        .catch((e) => console.error(e))

    $("#modalEdit").modal("hide")
}

// DELETE user
function getModalDelete(id) {
    fetch('http://localhost:8080/admin/users/' + id)
        .then(response => response.json())
        .then(user => {
            console.log(user)


            $("#modalDelete").modal()

            const userInff = document.getElementById("eId")
            let ans = user.id
            console.log(ans)
            let two = user.username
            console.log(two)

            document.getElementById("dId").value = user.id
            document.getElementById("dUsername").value = user.username
            document.getElementById("dPassword").value = user.password
            document.getElementById("dName").value = user.name
            document.getElementById("dLastname").value = user.lastname
            document.getElementById("dEmail").value = user.email


            $('#dRoles').empty()
            let rolesList1 = ["ROLE_ADMIN", "ROLE_USER"]
            console.log(rolesList1)

            let userRoles = ''
            user.roles.forEach(role => {
                userRoles += role.role
            })

            rolesList1.forEach(function (value) {
                if (userRoles.includes(value)) {
                    $('#dRoles').append('<option id="option"' + value + ' value="' + value + '" selected>' + value + '</option>')
                } else {
                    $('#dRoles').append('<option id="option"' + value + ' value="' + value + '">' + value + '</option>')
                }
            })

        })

}


function deleteUser() {

    let currentUserId = window.formDeleteUser.dId.value;

    fetch('http://localhost:8080/admin/delete/' + currentUserId, {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(data => {
            console.log(data)
            removeUser(currentUserId)
        })

    $("#modalDelete").modal("hide")
}







