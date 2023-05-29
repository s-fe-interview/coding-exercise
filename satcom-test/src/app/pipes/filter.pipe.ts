import { Pipe, PipeTransform, Type } from '@angular/core';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

type Item = Product | Customer;

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Item[], descriptionQuery: string): Item[] {
    if (!descriptionQuery) {
      return items;
    }

    descriptionQuery = descriptionQuery.trim().toLowerCase();

    return items.filter((item: Item) => {
      if (isProduct(item) && item.premium) {
        return false;
      }

      if (isProduct(item) && item.price) {
        return (
          item.name.toLowerCase().includes(descriptionQuery) ||
          item.price.toFixed(2).includes(descriptionQuery)
        );
      }
      return item.name.toLowerCase().includes(descriptionQuery);
    });
  }
}

function isProduct(item: Item): item is Product {
  return 'price' in item;
}
