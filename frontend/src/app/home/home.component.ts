import { Component, OnInit, ViewChild } from '@angular/core';
import { EditAddressModalComponent} from '../edit-address-modal/edit-address-modal.component';
import { CreateAddressModalComponent } from '../create-address-modal/create-address-modal.component';
import { DeleteAddressModalComponent } from '../delete-address-modal/delete-address-modal.component';
import { CreateVehicleModalComponent } from '../create-vehicle-modal/create-vehicle-modal.component';
import { EditVehicleModalComponent } from '../edit-vehicle-modal/edit-vehicle-modal.component';
import { DeleteVehicleModalComponent } from '../delete-vehicle-modal/delete-vehicle-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Address } from '../model/Address';
import { Vehicle } from '../model/Vehicle';
import { AddressService } from '../services/address.service';
import { VehicleService } from '../services/vehicle.service';
import { AddressUpdateService } from '../services/address-update-service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private modalService: MdbModalService, 
    private addressService: AddressService,
    private vehicleService: VehicleService,
    private addressUpdateService: AddressUpdateService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // modal logic
  modalRef: MdbModalRef<DeleteAddressModalComponent> | MdbModalRef<EditAddressModalComponent> | MdbModalRef<CreateAddressModalComponent> | null = null;
  modalVehicleRef: MdbModalRef<DeleteVehicleModalComponent> | MdbModalRef<EditVehicleModalComponent> | MdbModalRef<CreateVehicleModalComponent> | null = null;

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

  openDeleteVehicleModal(vehicle: Vehicle) {
    this.modalVehicleRef = this.modalService.open(DeleteVehicleModalComponent, {
      data: {
        vehicle: vehicle
      }
    });
  }
  
  openEditVehicleModal(vehicle: Vehicle) {
    this.modalVehicleRef = this.modalService.open(EditVehicleModalComponent, {
      modalClass: 'modal-xl',
      data: {
        vehicle: vehicle
      }
    });
  }
  
  openCreateVehicleModal() {
    this.modalVehicleRef = this.modalService.open(CreateVehicleModalComponent, {
      modalClass: 'modal-xl'
    });
  }
  

  // Alert logic
  showDeletedAlert = false;
  showCreatedAlert = false;
  showUpdatedAlert = false;

  showVehicleDeletedAlert = false;
  showVehicleCreatedAlert = false;
  showVehicleUpdatedAlert = false;

  // Pagination logic
  pag:number= 1;
  counter:number = 5;

  // API logic

  addresses: Address[] = [];
  vehicles: Vehicle[] = [];
  searchTerm: string = '';
  vehicleSearchTerm: string = '';

  displayedColumns: string[] = ['index', 'street', 'number', 'complement', 'neighborhood', 'city', 'state', 'zipCode', 'userCount', 'actions'];
  displayedVehicleColumns: string[] = ['index', 'model', 'color', 'licenseNumber', 'year', 'actions'];
  
  addressDataSource = new MatTableDataSource<Address>();
  vehicleDataSource = new MatTableDataSource<Vehicle>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.addressDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyVehicleFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicleDataSource.filter = filterValue.trim().toLowerCase();
  }

  getAddresses():void {
    this.addressService.getAddresses().subscribe((addresses) => {
      this.addresses = addresses;
      this.addressDataSource.data = this.addresses;

      this.addressDataSource.paginator = this.paginator;
      this.addressDataSource.sort = this.sort;
    });
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.vehicleDataSource.data = this.vehicles;

      this.vehicleDataSource.paginator = this.paginator;
      this.vehicleDataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.getAddresses();
    this.getVehicles();
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
    this.addressService.searchAddresses(this.searchTerm).subscribe((data: Address[]) => {
      this.addresses = data;
      this.addressDataSource.data = data;
    });
  }

  searchVehicles() {
    // this.vehicleService.searchVehicles(this.vehicleSearchTerm).subscribe((data: Vehicle[]) => {
    //   this.vehicles = data;
    //   this.vehicleDataSource.data = data;
    // });
  }

}
