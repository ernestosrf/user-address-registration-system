package br.com.projeto.api.controllers;

import java.util.List;

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
import lombok.RequiredArgsConstructor;
import br.com.projeto.api.services.AddressService;
import br.com.projeto.api.services.AuthorizationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import br.com.projeto.api.dtos.AuthenticationDto;
import br.com.projeto.api.dtos.RegisterDto;
import br.com.projeto.api.models.User;
// models
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

    @GetMapping("/secure")
    public ResponseEntity<Object> secure(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok("If you see this, you are logged in as " + user.getUsername()
            + " and your ID is " + user.getId());
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDto authenticationDto) {
        return authorizationService.login(authenticationDto);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody RegisterDto registerDto) {
        return authorizationService.register(registerDto);
    }

    @PostMapping("/auth/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        return authorizationService.logout(request, response);
    }

    @PostMapping("/addresses")
    public ResponseEntity<UserAddress> createAddress(@RequestBody UserAddress address) {
        UserAddress createdAddress = addressService.createAddress(address);
        return ResponseEntity.ok(createdAddress);
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<UserAddress>> getAddressesByUserId(@AuthenticationPrincipal User user) {
        String userId = user.getId();
        List<UserAddress> userAddresses = addressService.getAddressesByUserId(userId);
        return ResponseEntity.ok(userAddresses);
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<UserAddress> updateAddress(@PathVariable String addressId, @RequestBody UserAddress address) {
        try {
            UserAddress updatedAddress = addressService.updateAddress(addressId, address);
            return ResponseEntity.ok(updatedAddress);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable String addressId) {
        try {
            addressService.deleteAddress(addressId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
 