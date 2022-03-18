package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {

    void addUser(User user, String[] newRoles);

    public  void update(User user,String[] currentRoles);

    List<User> listUsers();

    User getUserById(long id);

    void deleteById(long id);

    User getUserByUsername(String username);

}
