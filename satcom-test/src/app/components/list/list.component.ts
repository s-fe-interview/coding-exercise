import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { MockDataService } from 'src/app/services/mock-data.service';
import { UpdateElementService } from 'src/app/services/update-element.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();
  elementList: (Product | Customer)[];

  filteredSearch!: string;

  constructor(
    private mockDataService: MockDataService,
    private updateElementService: UpdateElementService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges
        .pipe(debounceTime(300))
        .subscribe((filterValue) => {
          this.onFilterChange(filterValue);
        })
    );
  }

  onSelectItem(item: Product | Customer): void {
    this.updateElementService.sendCurrentElement(item);
  }

  private getData(): void {
    this.subscriptions.add(
      this.mockDataService.getData().subscribe((data) => {
        this.elementList = data;
      })
    );
  }

  private onFilterChange(inputSearched: string) {
    this.filteredSearch = inputSearched;
  }
}
