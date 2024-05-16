package br.com.projeto.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.models.UserAddress;

@Repository
public interface AddressRepository extends JpaRepository<UserAddress, String>{

    @Query("SELECT a FROM UserAddress a WHERE a.userId = :userId")
    List<UserAddress> findByUserId(String userId);

    @Query("SELECT a FROM UserAddress a WHERE a.userId = :userId AND (:searchTerm IS NULL OR :searchTerm = '' OR ("
    + "a.street LIKE %:searchTerm% OR "
    + "a.number LIKE %:searchTerm% OR "
    + "a.complement LIKE %:searchTerm% OR "
    + "a.neighborhood LIKE %:searchTerm% OR "
    + "a.city LIKE %:searchTerm% OR "
    + "a.state LIKE %:searchTerm% OR "
    + "a.country LIKE %:searchTerm% OR "
    + "a.zipCode LIKE %:searchTerm%))")
    List<UserAddress> findBySearchTerm(String searchTerm, String userId);
    
}
