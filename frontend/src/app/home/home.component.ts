import { Component } from '@angular/core';
import { EditAddressModalComponent} from '../edit-address-modal/edit-address-modal.component';
import { CreateAddressModalComponent } from '../create-address-modal/create-address-modal.component';
import { DeleteAddressModalComponent } from '../delete-address-modal/delete-address-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { AddressService } from '../services/address.service';
import { AddressUpdateService } from '../services/address-update-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // modal logic
  modalRef: MdbModalRef<DeleteAddressModalComponent> | MdbModalRef<EditAddressModalComponent> | MdbModalRef<CreateAddressModalComponent> | null = null;

  constructor(
    private modalService: MdbModalService, 
    private addressService: AddressService,
    private addressUpdateService: AddressUpdateService,
    private router: Router
  ) {}

  openDeleteModal(address: Address) {
    this.modalRef = this.modalService.open(DeleteAddressModalComponent, {
      data: {
        address: address
      }
    });
  }

  openEditModal(address: Address) {
    this.modalRef = this.modalService.open(EditAddressModalComponent, {
      modalClass: 'modal-xl',
      data: {
        address: address
      }
    });
  }

  openCreateModal() {
    this.modalRef = this.modalService.open(CreateAddressModalComponent, {
      modalClass: 'modal-xl'
    });
  }

  // Alert logic

  showDeletedAlert = false;
  showCreatedAlert = false;
  showUpdatedAlert = false;

  // API logic

  address = new Address('03b11e89-fd16-4129-a429-587ddc485f4f');

  addresses: Address[] = [];

  getAddresses():void {
    this.addressService.getAddresses()
    .subscribe((addresses) => {
      this.addresses = addresses
  });
  }

  ngOnInit() {
    this.getAddresses();
    this.subscribeToAddressUpdateService();
  }

  private subscribeToAddressUpdateService():void {

    this.addressUpdateService.addressUpdated$.subscribe(() =>{
      this.showUpdatedAlert = true;
      setTimeout(() => this.showUpdatedAlert = false, 5000);
      this.getAddresses();
    });

    this.addressUpdateService.addressDeleted$.subscribe(() => {
      this.showDeletedAlert = true;
      setTimeout(() => this.showDeletedAlert = false, 5000);
      this.getAddresses();
    
    });

    this.addressUpdateService.addressCreated$.subscribe(() => {
      this.showCreatedAlert = true;
      setTimeout(() => this.showCreatedAlert = false, 5000);
      this.getAddresses();
    });
  }

  onLogout() {
    this.router.navigateByUrl('/login');
  }
}
