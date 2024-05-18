package br.com.projeto.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.models.UserAddress;

@Repository
public interface AddressRepository extends JpaRepository<UserAddress, String>{

    @Query("SELECT a FROM UserAddress a JOIN a.users u WHERE u.id = :userId")
    List<UserAddress> findByUserId(String userId);

    @Query("SELECT a FROM UserAddress a JOIN a.users u WHERE u.id = :userId AND (:searchTerm IS NULL OR :searchTerm = '' OR ("
    + "a.street LIKE %:searchTerm% OR "
    + "a.number LIKE %:searchTerm% OR "
    + "a.complement LIKE %:searchTerm% OR "
    + "a.neighborhood LIKE %:searchTerm% OR "
    + "a.city LIKE %:searchTerm% OR "
    + "a.state LIKE %:searchTerm% OR "
    + "a.country LIKE %:searchTerm% OR "
    + "a.zipCode LIKE %:searchTerm%))")
    List<UserAddress> findBySearchTerm(String searchTerm, String userId);

    @Query("SELECT a FROM UserAddress a WHERE a.street = :street AND a.number = :number AND a.complement = :complement AND a.neighborhood = :neighborhood AND a.city = :city AND a.state = :state AND a.country = :country AND a.zipCode = :zipCode")
    UserAddress findByAddress(String street, String number, String complement, String neighborhood, String city, String state, String country, String zipCode);

    @Query("SELECT a FROM UserAddress a WHERE a.id = :id")
    Optional<UserAddress> findById(String id);
    
}
