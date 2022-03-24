// ADD user
function addNewUser() {
    let form = window.formNewUser.nRoles;
    let newUserRoles = [];
    let rolesList = document.createElement('ul');

    for (let i = 0; i < form.length; i++) {
        let option = form.options[i];
        if (option.selected) {
            newUserRoles.push(option.value);
        }
    }

    fetch('http://localhost:8080/admin/create?newRoles=' + newUserRoles, {
        method: 'POST',
        body: JSON.stringify({
            username: window.formNewUser.nUsername.value,
            password: window.formNewUser.nPassword.value,
            name: window.formNewUser.nName.value,
            lastname: window.formNewUser.nLastname.value,
            email: window.formNewUser.nEmail.value,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json()).then(response => console.log(response))
        .then(data => {

            let newUser = data
            users.push(newUser)
            renderUsers(users)
        })
}

