package br.com.projeto.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.api.models.UserAddress;
import br.com.projeto.api.repository.AddressRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public UserAddress createAddress(UserAddress address) {
        return addressRepository.save(address);
    }

    public List<UserAddress> getAddressesByUserId(String userId) {
        return addressRepository.findByUserId(userId);
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

    public UserAddress deleteAddress(String id) {
        UserAddress address = addressRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Address not found"));
        addressRepository.delete(address);
        return address;
    }

    public List<UserAddress> findBySearchTerm(String searchTerm, String userId) {
        return addressRepository.findBySearchTerm(searchTerm, userId);
    }

}
