package br.com.projeto.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import br.com.projeto.api.repository.UserRepository;
import br.com.projeto.api.security.JwtIssuer;
import br.com.projeto.api.services.AddressService;
import br.com.projeto.api.services.AuthorizationService;
import jakarta.validation.Valid;
import br.com.projeto.api.dtos.AuthenticationDto;
import br.com.projeto.api.dtos.RegisterDto;
// models
import br.com.projeto.api.models.User;
import br.com.projeto.api.models.UserAddress;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    AuthorizationService authorizationService;

    @Autowired
    private AddressService addressService;

    @GetMapping("/")
    public String test() {
        return "Hello World!";
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDto authenticationDto) {
        return authorizationService.login(authenticationDto);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody RegisterDto registerDto) {
        return authorizationService.register(registerDto);
    }

    @PostMapping("/addresses")
    public ResponseEntity<UserAddress> createAddress(@RequestBody UserAddress address) {
        UserAddress createdAddress = addressService.createAddress(address);
        return ResponseEntity.ok(createdAddress);
    }

    @GetMapping("/addresses/{userId}")
    public ResponseEntity<List<UserAddress>> getAddressesByUserId(@PathVariable String userId) {
        List<UserAddress> userAddresses = addressService.getAddressesByUserId(userId);
        return ResponseEntity.ok(userAddresses);
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<UserAddress> updateAddress(@PathVariable String addressId, @RequestBody UserAddress address) {
        UserAddress updatedAddress = addressService.updateAddress(addressId, address);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable String addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.noContent().build();
    }

}
 