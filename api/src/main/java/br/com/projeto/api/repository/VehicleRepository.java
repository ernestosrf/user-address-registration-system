package br.com.projeto.api.repository;
import br.com.projeto.api.models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByUserId(String userId);

    Optional<Vehicle> findByIdAndUserId(Long vehicleId, String userId);
}

