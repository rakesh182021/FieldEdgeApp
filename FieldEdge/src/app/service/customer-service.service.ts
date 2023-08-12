import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerModel } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(public httpModule: HttpClient) { }

  getAllCustomer(): Observable<any> {
    return this.httpModule.get('/api/Customers');
  }

  getCustomerById(id: string): Observable<any> {
    return this.httpModule.get('/api/Customer/' + id);
  }

  createCustomer(customer: CustomerModel): Observable<any> {
    customer.id = `${this.getRandomInteger(0, 1000)}`;
    customer.firstname_ascii = customer.firstname;
    customer.firstname_country_frequency = customer.id;
    customer.firstname_country_rank = customer.id;
    
    customer.lastname_ascii = customer.lastname;
    customer.lastname_country_frequency = customer.id;
    customer.lastname_country_rank = customer.id;
    debugger
    return this.httpModule.post('/api/Customer', customer);
  }

  updateCustomer(customer: CustomerModel): Observable<any> {
    return this.httpModule.post('/api/Customer/' + customer.id, customer);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.httpModule.delete('/api/Customer/' + id);
  }

  getRandomInteger(min: number, max: number) {
    // Ensure min is smaller than or equal to max
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
