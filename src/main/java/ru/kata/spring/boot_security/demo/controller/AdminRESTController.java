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
        userService.addUser(user, newRoles);
        return user;
    }

    @RequestMapping(value = "/update",
            produces = "application/json",
            method=RequestMethod.PUT)
    public User update(@RequestBody @Valid User user,
                       @RequestParam(required = false, name = "currentRoles") String[] currentRoles) {
        userService.update(user, currentRoles);
        return user;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        userService.deleteById(id);
    }
}
