import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerServiceService } from '../service/customer-service.service';
import { Router } from '@angular/router';
import { CustomerModel } from '../model/customer.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.scss']
})
export class CustomerGridComponent implements OnInit {
  displayedColumns = ['id', 'firstname', 'lastname', 'email', 'phone_Number', 'country_code', 'gender', 'balance', 'edit/delete'];
  dataSource = new MatTableDataSource([]);
  isLoading = false;
  
  constructor(private customerServiceService: CustomerServiceService,
    private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getCustomerList();
  }

  applyFilter(event: any) {
    let filterValue = event.target.value.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getCustomerList() {
    this.isLoading = true;
    this.customerServiceService.getAllCustomer().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data);
      },
      (error: any) => {
        this.isLoading = false;
        this._snackBar.open(error.message, 'x');
      }
    );
  }

  AddCustomer() {
    this.router.navigate(['/customer/add']);
  }

  EditCustomer(data: any) {
    this.router.navigate(['/customer/edit', data.id]);
  }

  DeleteCustomer(data: any) {
    this.isLoading = true;
    this.customerServiceService.deleteCustomer(data.id).subscribe(
      (datas: any) => {
        this.isLoading = false;
        let index = this.dataSource.data.findIndex((obj: CustomerModel) => obj.id == data.id);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription(); // Update the data source
        }
        this._snackBar.open("Customer Deleted Successfully!!", 'x');
      },
      (error: any) => {
        this.isLoading = false;
        this._snackBar.open(error.message, 'x');
      }
    );
  }
}