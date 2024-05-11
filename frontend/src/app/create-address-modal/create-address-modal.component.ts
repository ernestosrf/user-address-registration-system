import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { AddressService } from '../services/address.service';
import { AddressUpdateService } from '../services/address-update-service';
import { CEPErrorCode, NgxViacepService } from "@brunoc/ngx-viacep";
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create-address-modal',
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent {
  constructor(
    public modalRef: MdbModalRef<CreateAddressModalComponent>, 
    private addressService: AddressService,
    private addressUpdateService: AddressUpdateService,
    private viacep: NgxViacepService
  ) {}

  formatZipCode(event: any) {
    let value = event.target.value;

    value = value.replace(/\D/g, '');

    if (value.length >= 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 9);
    }

    event.target.value = value;
  }  

  // API logic
  address = new Address();
  zipCodeError = '';
  zipCodeNumber = '';

  searchAddressByZipCode(zipCode: string): void {
    this.zipCodeError = '';
    this.zipCodeNumber = zipCode.replace(/\D/g, '');
    this.viacep.buscarPorCep(this.zipCodeNumber)
    .pipe(
      catchError((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("CEP_MUITO_CURTO")) {
          this.zipCodeError = 'CEP muito curto';
        } else if (errorMessage.includes("CEP_NAO_ENCONTRADO")) {
          this.zipCodeError = 'CEP não encontrado';
        } else if (errorMessage.includes("CEP_VAZIO")) {
          this.zipCodeError = 'CEP vazio'
        } else {
          this.zipCodeError = 'Erro ao buscar CEP';
        }
        return of(null);
      })
    )
    .subscribe((addressData: any) => {
      this.fillAddress(addressData);
    });
  }

  createAddress():void {
    this.addressService.createAddress(this.address)
    .subscribe(() => {
      this.addressUpdateService.addressCreated();
      this.modalRef.close();
    });
  }

  fillAddress(addressData: any) {
    this.address.street = addressData.logradouro;
    this.address.complement = addressData.complemento;
    this.address.neighborhood = addressData.bairro;
    this.address.city = addressData.localidade;
    this.address.state = addressData.uf;
  }

}
