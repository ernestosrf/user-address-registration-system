package br.com.projeto.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

import br.com.projeto.api.dtos.UserAddressDto;
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

    public List<UserAddressDto> getAddressesByUserId(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getAddresses().stream().map(address -> {
            UserAddressDto dto = new UserAddressDto();
            dto.setId(address.getId());
            dto.setStreet(address.getStreet());
            dto.setNumber(address.getNumber());
            dto.setComplement(address.getComplement());
            dto.setNeighborhood(address.getNeighborhood());
            dto.setCity(address.getCity());
            dto.setState(address.getState());
            dto.setCountry(address.getCountry());
            dto.setZipCode(address.getZipCode());
            dto.setUserCount(address.getUsers().size());
            return dto;
        }).collect(Collectors.toList());
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
        List<UserAddress> userAddresses = user.getAddresses().stream().collect(Collectors.toList());

        for (UserAddress userAddress : userAddresses) {
            if (userAddress.getId().equals(Long.valueOf(id))) {
                user.getAddresses().remove(userAddress);
                userRepository.save(user);
                return userAddress;
            }        
        }
        throw new RuntimeException("Address not found");        
    }

    public List<UserAddress> findBySearchTerm(String searchTerm, String userId) {
        return addressRepository.findBySearchTerm(searchTerm, userId);
    }

}
