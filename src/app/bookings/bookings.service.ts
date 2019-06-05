import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  // tslint:disable-next-line: variable-name
  private _bookings: Booking[];

  constructor() {
    this._bookings = [
      new Booking('b1', 'p1', 'u1', 'Some Dummy Place 0010', 2),
      new Booking('b2', 'p2', 'u1', 'Some Dummy Place 0011', 2),
      new Booking('b3', 'p3', 'u1', 'Some Dummy Place 0012', 2),
      new Booking('b4', 'p2', 'u1', 'Some Dummy Place 0013', 2),
    ];
  }

  get bookings() {
    return [...this._bookings];
  }
}
