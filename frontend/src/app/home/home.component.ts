import { Component } from '@angular/core';
import { EditAddressModalComponent} from '../edit-address-modal/edit-address-modal.component';
import { CreateAddressModalComponent } from '../create-address-modal/create-address-modal.component';
import { DeleteAddressModalComponent } from '../delete-address-modal/delete-address-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { AddressService } from '../services/address.service';
import { AddressUpdateService } from '../services/address-update-service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private modalService: MdbModalService, 
    private addressService: AddressService,
    private addressUpdateService: AddressUpdateService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // modal logic
  modalRef: MdbModalRef<DeleteAddressModalComponent> | MdbModalRef<EditAddressModalComponent> | MdbModalRef<CreateAddressModalComponent> | null = null;

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

  // Pagination logic
  pag:number= 1;
  counter:number = 5;

  // API logic
  address = new Address();

  addresses: Address[] = [];
  searchTerm: string = '';

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
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  searchAddresses() {
    this.addressService.searchAddresses(this.searchTerm).subscribe((data: any[]) => {
      this.addresses = data;
    });
  }
}
