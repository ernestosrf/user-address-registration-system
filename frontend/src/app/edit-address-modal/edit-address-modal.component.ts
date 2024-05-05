import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { AddressService } from '../services/address.service';
import { AddressUpdateService } from '../services/address-update-service';

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
    private addressUpdateService: AddressUpdateService  
  ) {}

  // API logic
  
  updateAddress():void {
    this.addressService.updateAddress(this.address, this.address.id)
    .subscribe(() => {
      this.addressUpdateService.addressUpdated();
      this.modalRef.close();
    });
  }

}
