package com.example.demo.repository;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}