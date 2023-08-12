import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerAddEditComponent} from './customer-add-edit/customer-add-edit.component'
import {CustomerGridComponent} from './customer-grid/customer-grid.component'

const routes: Routes = [
  { path: '', component: CustomerGridComponent,  },    
  { path: 'customer', component: CustomerGridComponent  },  
  { path: 'customer/add', component: CustomerAddEditComponent },
  { path: 'customer/edit/:id', component: CustomerAddEditComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
 }
