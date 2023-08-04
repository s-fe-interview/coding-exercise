import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { MockDataService } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();
  public data$: Observable<(Product | Customer)[]>;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
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
    );
  }

  loadData(): void {
    this.data$ = this.mockDataService.getData();
  }

  onFilterChange(inputSearched: string) {}

  onClick(element: Product | Customer) {
    this.mockDataService.setSelectedElement(element);
  }
}
