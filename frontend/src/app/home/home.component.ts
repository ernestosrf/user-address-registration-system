import { Component } from '@angular/core';
import { EditAddressModalComponent} from '../edit-address-modal/edit-address-modal.component';
import { CreateAddressModalComponent } from '../create-address-modal/create-address-modal.component';
import { DeleteAddressModalComponent } from '../delete-address-modal/delete-address-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  modalRef: MdbModalRef<DeleteAddressModalComponent> | MdbModalRef<EditAddressModalComponent> | MdbModalRef<CreateAddressModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openDeleteModal() {
    this.modalRef = this.modalService.open(DeleteAddressModalComponent);
  }

  openEditModal() {
    this.modalRef = this.modalService.open(EditAddressModalComponent, {
      modalClass: 'modal-xl'
    });
  }

  openCreateModal() {
    this.modalRef = this.modalService.open(CreateAddressModalComponent, {
      modalClass: 'modal-xl'
    });
  }
}
