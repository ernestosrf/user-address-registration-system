import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-create-address-modal',
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent {
  constructor(public modalRef: MdbModalRef<CreateAddressModalComponent>) {}
}
