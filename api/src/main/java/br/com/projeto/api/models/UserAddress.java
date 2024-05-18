package br.com.projeto.api.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_address")
@Getter
@Setter
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;

    private String number;

    private String complement;

    private String neighborhood;

    private String city;

    private String state;

    private String country;

    private String zipCode;

    @ManyToMany(mappedBy = "addresses")
    @JsonBackReference
    private Set<User> users = new HashSet<>();

    public UserAddress(String street, String number, String complement, String neighborhood, String city, String state, String country, String zipCode, String userId) {
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
    }

    public UserAddress() {
    }

}