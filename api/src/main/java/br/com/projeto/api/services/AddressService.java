package br.com.projeto.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

import br.com.projeto.api.models.User;
import br.com.projeto.api.models.UserAddress;
import br.com.projeto.api.repository.AddressRepository;
import br.com.projeto.api.repository.UserRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public UserAddress createOrAssignAddress(UserAddress address, User user) {
        UserAddress existingAddress = addressRepository.findByAddress(
            address.getStreet(),
            address.getNumber(),
            address.getComplement(),
            address.getNeighborhood(),
            address.getCity(),
            address.getState(),
            address.getCountry(),
            address.getZipCode()
        );

        if(existingAddress == null) {
            existingAddress = addressRepository.save(address);
        }

        if (!user.getAddresses().contains(existingAddress)) {
            user.getAddresses().add(existingAddress);
            userRepository.save(user);
        }

        return existingAddress;
    }

    public List<UserAddress> getAddressesByUserId(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")).getAddresses().stream().collect(Collectors.toList());
    }

    public UserAddress updateAddress(String id, UserAddress address) {
        UserAddress addressToUpdate = addressRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Address not found"));
        addressToUpdate.setStreet(address.getStreet());
        addressToUpdate.setNumber(address.getNumber());
        addressToUpdate.setComplement(address.getComplement());
        addressToUpdate.setNeighborhood(address.getNeighborhood());
        addressToUpdate.setCity(address.getCity());
        addressToUpdate.setState(address.getState());
        addressToUpdate.setCountry(address.getCountry());
        addressToUpdate.setZipCode(address.getZipCode());
        return addressRepository.save(addressToUpdate);
    }

    public UserAddress deleteAddress(String id, User user) {
        UserAddress address = addressRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Address not found"));

        return address;
    }

    public List<UserAddress> findBySearchTerm(String searchTerm, String userId) {
        return addressRepository.findBySearchTerm(searchTerm, userId);
    }

}
