import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { AddressService } from '../services/address.service';
import { AddressUpdateService } from '../services/address-update-service';

@Component({
  selector: 'app-create-address-modal',
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent {
  constructor(
    public modalRef: MdbModalRef<CreateAddressModalComponent>, 
    private addressService: AddressService,
    private addressUpdateService: AddressUpdateService
  ) {}

  // API logic
  address = new Address();

  createAddress():void {
    this.addressService.createAddress(this.address)
    .subscribe(() => {
      this.addressUpdateService.addressCreated();
      this.modalRef.close();
    });
  }

}
