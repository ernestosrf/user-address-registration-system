package br.com.projeto.api.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.models.User;

@Repository
public interface Repo extends CrudRepository<User, UUID >{
    
}
