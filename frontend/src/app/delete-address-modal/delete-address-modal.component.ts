import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AddressService } from '../services/address.service';
import { Address } from '../model/Address';
import { AddressUpdateService } from '../services/address-update-service';

@Component({
  selector: 'app-delete-address-modal',
  templateUrl: './delete-address-modal.component.html',
  styleUrl: './delete-address-modal.component.css'
})
export class DeleteAddressModalComponent {
  @Input()
  address!: Address;
  constructor(
    public modalRef: MdbModalRef<DeleteAddressModalComponent>, 
    private addressService: AddressService,
    private addressUpdateService: AddressUpdateService
  ) {}

  // API logic

  deleteAddress(id: string):void {
    this.addressService.deleteAddress(id)
    .subscribe(() => {
      this.addressUpdateService.addressDeleted();
      this.modalRef.close();

    });
  }

}
