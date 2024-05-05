import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressUpdateService {
  private addressDeletedSource = new Subject<void>();
  private addressUpdatedSource = new Subject<void>();
  private addressCreatedSource = new Subject<void>();

  addressDeleted$ = this.addressDeletedSource.asObservable();
  addressUpdated$ = this.addressUpdatedSource.asObservable();
  addressCreated$ = this.addressCreatedSource.asObservable();

  addressDeleted(): void {
    this.addressDeletedSource.next();
  }

  addressUpdated(): void {
    this.addressUpdatedSource.next();
  }

  addressCreated(): void {
    this.addressCreatedSource.next();
  }
}
