import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Address } from '../model/Address';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url:string = 'http://localhost:8080/addresses';
  private viacepUrl:string = 'https://viacep.com.br/ws/';

  constructor(private http:HttpClient, private authService: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getAddresses():Observable<Address[]> {
    return this.http.get<Address[]>(this.url, {headers: this.getHeaders()});
  }

  createAddress(address: Address):Observable<any> {
    return this.http.post<Address>(this.url, address, {headers: this.getHeaders()});
  }

  updateAddress(address: Address, id: string):Observable<any> {
    return this.http.put<Address>(this.url + '/' + id, address, {headers: this.getHeaders()});
  }

  deleteAddress(id: string):Observable<any> {
    return this.http.delete<Address>(this.url + '/' + id, {headers: this.getHeaders()});
  }

  searchAddresses(searchTerm: string):Observable<Address[]> {
    return this.http.get<Address[]>(this.url + '/search?searchTerm=' + searchTerm, {headers: this.getHeaders()});
  }

  consultCep(cep: string): Observable<any> {
    const url = `${this.viacepUrl}${cep}/json/`;

    return this.http.get(url).pipe(
      map((data: any) => {
        if (data.erro) {
          throw new Error('CEP não encontrado.');
        }
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(() => new Error('Requisição inválida. Verifique o formato do CEP.'));
    } else if (error.status === 404) {
      return throwError(() => new Error('CEP não encontrado.'));
    } else {
      return throwError(() => new Error('Ocorreu um erro no servidor. Tente novamente mais tarde.'));
    }
  }

}
