package br.com.projeto.api.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;

    private String color;

    private String licenseNumber;

    private Integer year;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
