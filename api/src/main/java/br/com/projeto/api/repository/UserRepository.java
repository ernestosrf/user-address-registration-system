package br.com.projeto.api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>{

    @Query("SELECT u FROM User u WHERE u.username = :username")
    UserDetails findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findById(String id);

}
