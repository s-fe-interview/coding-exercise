import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PremiumProductComponent } from './components/premium-product/premium-product.component';
import { ListComponent } from './components/list/list.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockDataService } from './services/mock-data.service';
import { FilterByNamePipe } from './pipes/filterByName.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    PremiumProductComponent,
    ListComponent,
    ViewerComponent,
    FilterByNamePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [MockDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
