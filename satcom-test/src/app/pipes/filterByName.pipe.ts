import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: (Product | Customer)[], descriptionQuery: string) {
    descriptionQuery = descriptionQuery?.trim().toLowerCase();

    if (descriptionQuery) {
      return items.filter((item) =>
        item.name.toLowerCase().includes(descriptionQuery)
      );
    } else {
      return items;
    }
  }
}
