const url = 'http://localhost:8080/api/user'

let loggedInUser = document.querySelector('#infoTable')

fetch(url)
    .then(res => res.json())
    .then(user => {
        loggedInUser.innerHTML = `
                                <td>${user.id}</td>
                                <td>${user.username}</td>
                                <td>${user.name}</td>
                                <td>${user.lastname}</td>
                                <td>${user.email}</td>
                                <td>${getRoleList(user).textContent.replaceAll("ROLE_", "")}</td>
                                `;
    })

/*let infoTable = document.getElementById("infoTable");

fetch('http://localhost:8080/api/user')
    .then(response => response.json())
    .then(user => {
        infoTable.innerHTML = "";
        let row = infoTable.insertRow(0);
        let cell0 = row.insertCell(0);
        cell0.innerHTML = user.id;
        let cell1 = row.insertCell(1);
        cell1.innerHTML = user.username;
        let cell11 = row.insertCell(2);
        cell11.innerHTML = user.name;
        let cell2 = row.insertCell(3);
        cell2.innerHTML = user.lastname;
        let cell3 = row.insertCell(4);
        cell3.innerHTML = user.email;
        let cell5 = row.insertCell(5);
        cell5.innerHTML = getRoleList(user).textContent.replaceAll("ROLE_", "");
    });

function getRoleList(user) {
    let roleList = document.createElement('ul');
    for (let i = 0; i < user.roles.length; i++) {
        let role = document.createElement('li');
        role.textContent = user.roles[i].role + " ";
        roleList.appendChild(role);
    }
    return roleList;
}*/