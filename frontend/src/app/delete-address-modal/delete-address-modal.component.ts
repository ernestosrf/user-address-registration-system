import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-delete-address-modal',
  templateUrl: './delete-address-modal.component.html',
  styleUrl: './delete-address-modal.component.css'
})
export class DeleteAddressModalComponent {
  constructor(public modalRef: MdbModalRef<DeleteAddressModalComponent>) {}

}
