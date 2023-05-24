import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class UpdateElementService {
  private currentElementSubject: Subject<Product | Customer> = new Subject<
    Product | Customer
  >();

  public sendCurrentElement(element: Product | Customer) {
    this.currentElementSubject.next(element);
  }

  public getCurrentElement(): Observable<Product | Customer> {
    return this.currentElementSubject.asObservable();
  }
}
