import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/Address';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url:string = 'http://localhost:8080/addresses';

  constructor(private http:HttpClient, private authService: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getAddresses():Observable<Address[]> {
    return this.http.get<Address[]>(this.url, {headers: this.getHeaders()});
  }

  createAddress(address: Address):Observable<Address> {
    return this.http.post<Address>(this.url, address, {headers: this.getHeaders()});
  }

  updateAddress(address: Address, id: string):Observable<Address> {
    return this.http.put<Address>(this.url + '/' + id, address, {headers: this.getHeaders()});
  }

  deleteAddress(id: string):Observable<Address> {
    return this.http.delete<Address>(this.url + '/' + id, {headers: this.getHeaders()});
  }

}
