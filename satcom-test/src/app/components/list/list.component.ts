import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { MockDataService } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();
  elements: (Product | Customer)[];
  filteredListElements: (Product | Customer)[];
  @Output() elementSelected: EventEmitter<Product | Customer> = new EventEmitter<Product | Customer>();

  constructor(private mockDataService: MockDataService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getData()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((filterValue) => {
        this.onFilterChange(filterValue);
      })
    )
  }

  getData(): void {
    this.subscriptions.add(
      this.mockDataService.getData().subscribe((data) => {
        this.elements = data;
        this.filteredListElements = data;
      })
    );
  }

  onFilterChange(inputSearched: string) {
    const filteredElements = this.elements.filter((element) => {
      if ('birthDate' in element) {
        return element.name.toLowerCase().includes(inputSearched.toLowerCase());
      } else if ('productNumber' in element && 'price' in element && 'premium' in element) {
        const product = element as Product;
        const currency = product.premium ? 'USD' : 'EUR';
        const searchValue = inputSearched.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchValue);
        const priceMatch = (this.convertCurrency(product.price, currency)).toString().includes(searchValue);
        return !nameMatch && !priceMatch ? product.premium : true;
      }
      return false;
    });
  
    this.filteredListElements = filteredElements;
  }

  convertCurrency(price: number, currency: string): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    });
  
    return formatter.format(price);
  }
  
  selectElement(element: Product | Customer): void {
    this.elementSelected.emit(element);
  }

}