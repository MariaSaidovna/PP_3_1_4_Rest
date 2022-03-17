package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;


@Controller
@RequestMapping("/admin")
public class AdminController {

        @GetMapping
        public String getUserList() {
            return "AdA";
        }

  /*  @GetMapping
    public String getUserList(@AuthenticationPrincipal UserDetails userDetails,
                              Model model) {
        String username = userDetails.getUsername();
        User user = userService.getUserByUsername(username);
        model.addAttribute("user", user);
        model.addAttribute("userList", userService.listUsers());
        model.addAttribute("newUser", new User());
        model.addAttribute("roleList", roleService.getAllRoles());
        return "admin";
    }

   */


}