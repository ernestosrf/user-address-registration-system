import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrl: './edit-address-modal.component.css'
})
export class EditAddressModalComponent {
  constructor(public modalRef: MdbModalRef<EditAddressModalComponent>) {}
}
