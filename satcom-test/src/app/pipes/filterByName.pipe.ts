import { Pipe, PipeTransform, Type } from '@angular/core';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

type Item = Product | Customer;

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: Item[], descriptionQuery: string): Item[] {
    if (!descriptionQuery) {
      return items;
    }
    descriptionQuery = descriptionQuery.trim().toLowerCase();

    return items.filter((item: Item) => {
      if (isProduct(item) && item.premium) {
        return false;
      }

      return item.name.toLowerCase().includes(descriptionQuery);
    });
  }
}

function isProduct(item: Item): item is Product {
  return (item as Product).premium;
}
