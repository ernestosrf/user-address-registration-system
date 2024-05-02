package br.com.projeto.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.models.UserAddress;

@Repository
public interface AddressRepository extends JpaRepository<UserAddress, String>{

    List<UserAddress> findByUserId(String userId);
    
}
