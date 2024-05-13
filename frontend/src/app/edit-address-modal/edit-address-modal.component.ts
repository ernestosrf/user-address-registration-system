import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { AddressService } from '../services/address.service';
import { AddressUpdateService } from '../services/address-update-service';
import { CEPErrorCode, NgxViacepService } from '@brunoc/ngx-viacep';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrl: './edit-address-modal.component.css'
})
export class EditAddressModalComponent {
  @Input()
  address!: Address;
  constructor(
    public modalRef: MdbModalRef<EditAddressModalComponent>, 
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

  zipCodeError = '';
  zipCodeNumber = '';

  searchAddressByZipCode(zipCode: string): void {
    this.zipCodeError = '';
    this.zipCodeNumber = zipCode.replace(/\D/g, '');
    this.viacep.buscarPorCep(this.zipCodeNumber)
    .pipe(
      catchError((error) => {
        const errorMessage = error.message;
        switch (true) {
          case errorMessage.includes("CEP_MUITO_CURTO"):
            this.zipCodeError = 'CEP muito curto';
            break;
          case errorMessage.includes("CEP_NAO_ENCONTRADO"):
            this.zipCodeError = 'CEP não encontrado';
            break;
          case errorMessage.includes("CEP_VAZIO"):
            this.zipCodeError = 'CEP vazio';
            break;
          default:
            this.zipCodeError = 'Erro ao buscar CEP';
        }
        return of(null);
      })
    )
    .subscribe((addressData: any) => {
      this.fillAddress(addressData);
    });
  }
  
  updateAddress():void {
    if (!this.address.zipCode || !this.address.street || !this.address.number || !this.address.neighborhood || !this.address.city || !this.address.state) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    this.addressService.updateAddress(this.address, this.address.id)
    .subscribe(() => {
      this.addressUpdateService.addressUpdated();
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
