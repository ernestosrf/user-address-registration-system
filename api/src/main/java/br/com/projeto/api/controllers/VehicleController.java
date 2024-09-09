package br.com.projeto.api.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import br.com.projeto.api.models.User;
import br.com.projeto.api.models.Vehicle;
import br.com.projeto.api.services.VehicleService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/vehicles")
    public ResponseEntity<Map<String, Object>> createVehicle(@RequestBody @Valid Vehicle vehicle, @AuthenticationPrincipal User user) {
        Vehicle createdVehicle = vehicleService.createVehicle(vehicle, user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Vehicle created successfully");
        response.put("data", createdVehicle);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getVehiclesByUser(@AuthenticationPrincipal User user) {
        List<Vehicle> vehicles = vehicleService.getVehiclesByUser(user.getId());
        return ResponseEntity.ok(vehicles);
    }

    @PutMapping("/vehicles/{vehicleId}")
    public ResponseEntity<Map<String, Object>> updateVehicle(@PathVariable Long vehicleId, @RequestBody Vehicle vehicle) {
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicle(vehicleId, vehicle);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vehicle updated successfully");
            response.put("data", updatedVehicle);
            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vehicle not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/vehicles/{vehicleId}")
    public ResponseEntity<Map<String, Object>> deleteVehicle(@PathVariable Long vehicleId, @AuthenticationPrincipal User user) {
        try {
            vehicleService.deleteVehicle(vehicleId, user);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vehicle deleted successfully");
            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vehicle not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
