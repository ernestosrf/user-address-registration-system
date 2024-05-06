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

  // API logic
  address = new Address();
  zipCodeError = '';

  searchAddressByZipCode(zipCode: string): void {
    this.zipCodeError = '';
    this.viacep.buscarPorCep(zipCode)
    .pipe(
      catchError((error) => {
        if (error === CEPErrorCode.CEP_NAO_ENCONTRADO) {
          this.zipCodeError = 'CEP não encontrado';
        } else if ( error === CEPErrorCode.CEP_INVALIDO) {
          this.zipCodeError = 'CEP inválido';
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
    console.log(addressData);
    this.address.street = addressData.logradouro;
    this.address.complement = addressData.complemento;
    this.address.neighborhood = addressData.bairro;
    this.address.city = addressData.localidade;
    this.address.state = addressData.uf;
  }

}
