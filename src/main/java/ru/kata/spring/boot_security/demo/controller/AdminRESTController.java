package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminRESTController {
    private final UserService userService;
    private  final RoleService roleService;

    public AdminRESTController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getUsersList() {
        return userService.listUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable(value = "id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/create")
    public User create(@RequestBody @Valid User user,
                                       @RequestParam(required = false, name = "newRoles") String[] newRoles) {
        for (String role : newRoles) {
            user.setOneRole(roleService.getRoleByRole(role));
        }
        userService.addUser(user);
        return user;
    }

    @PatchMapping("/update")
    public User update(@RequestBody @Valid User user,
                                       @RequestParam(required = false, name = "currentRoles") String[] currentRoles) {
        for (String role : currentRoles) {
            user.setOneRole(roleService.getRoleByRole(role));
        }
        userService.update(user);
        return user;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        userService.deleteById(id);
    }
}
