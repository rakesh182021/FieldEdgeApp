import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from '../model/customer.model';
import { CustomerServiceService } from '../service/customer-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {

  customerForm: FormGroup;
  customerId: string = '';
  isLoading = false;

  constructor(private fb: FormBuilder,
    private customerServiceService: CustomerServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {

    this.customerForm = this.fb.group({
      id: [''],
      salutation: ['Ms.'],
      initials: ['K.'],
      firstname: [''],
      firstname_ascii: [''],
      gender: [''],
      firstname_country_rank: [''],
      firstname_country_frequency: [''],
      lastname: [''],
      lastname_ascii: [''],
      lastname_country_rank: [''],
      lastname_country_frequency: [''],
      email: ['', Validators.required],
      password: ['Testt@12233'],
      country_code: ['US'],
      country_code_alpha: ['USA'],
      country_name: ['United States'],
      primary_language_code: ['en'],
      primary_language: ['en'],
      balance: ['', Validators.required],
      phone_Number: [''],
      currency: ['$'],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parm: any) => {
      this.customerId = parm.get('id');
    });
    if(this.customerId)
      this.getCustomerById(this.customerId);
  }

  getCustomerById(customerId: string) {
    this.isLoading = true;
    this.customerServiceService.getCustomerById(customerId).subscribe(
      (data: any) => {
        this.customerForm.patchValue(data);
        this.isLoading = false;

      },
      (error: any) => {
        this.isLoading = false;
        this._snackBar.open(error.message, 'x');
      }
    );
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      if (this.customerForm.value.id !== null &&
        this.customerForm.value.id !== undefined &&
        this.customerForm.value.id !== '' &&
        this.customerForm.value.id !== "") {
        this.isLoading = true;
        this.customerServiceService.updateCustomer(this.customerForm.value).subscribe(
          (data: any) => {
            this.customerForm.patchValue(data);
            this.isLoading = false;
            this._snackBar.open("Customer Updated Successfully!!", 'x');
            this.router.navigate(['/customer']);            
          },
          (error: any) => {
            this.isLoading = false;
            this._snackBar.open(error.message, 'x');
          }
        );
      } else {
        this.isLoading = true;
        this.customerServiceService.createCustomer(this.customerForm.value).subscribe(
          (data: any) => {
            this.isLoading = false;
            this._snackBar.open("Customer Added Successfully!!", 'x');
            this.router.navigate(['/customer']);            
          },
          (error: any) => {
            this.isLoading = false;
            this._snackBar.open(error.message, 'x');
          }
        );
      }
    } else {
      this.customerForm.markAllAsTouched();
      this._snackBar.open('Please fill all required details', 'x');      
    }
  }
  
}
