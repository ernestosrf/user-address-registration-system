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
  // private t:string = 
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiZXJuZXN0byIsImV4cCI6MTcxNDk2OTExMX0.wi7ubqYu8wTibN9Alty43OFb67rlojH24Bgi0XqyXF4" 
  // // hardcoded token   /\

  // private headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.t);

  constructor(private http:HttpClient, private authService: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getAddresses():Observable<Address[]> {
    return this.http.get<Address[]>(this.url + '/03b11e89-fd16-4129-a429-587ddc485f4f', {headers: this.getHeaders()});
    //                                              hardcoded user id  /\
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
