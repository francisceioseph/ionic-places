import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  // tslint:disable-next-line: variable-name
  private _bookings = new BehaviorSubject<Booking[]>(
    [
      new Booking(
        'b1',
        'p1',
        'u1',
        'Some place 001',
        'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
        'Frankie',
        'Souza',
        2,
        new Date('2019-11-31'),
        new Date('2019-12-02')
      ),
      new Booking(
        'b2',
        'p1',
        'u1',
        'Some place 002',
        'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
        'Frankie',
        'Souza',
        2,
        new Date('2019-11-31'),
        new Date('2019-12-02')
      ),
      new Booking(
        'b3',
        'p1',
        'u1',
        'Some place 003',
        'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
        'Frankie',
        'Souza',
        2,
        new Date('2019-11-31'),
        new Date('2019-12-02')
      ),
      new Booking(
        'b4',
        'p1',
        'u1',
        'Some place 004',
        'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
        'Frankie',
        'Souza',
        2,
        new Date('2019-11-31'),
        new Date('2019-12-02')
      ),

    ]
  );

  constructor(private authService: AuthService) { }

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const booking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );

    return this._bookings.pipe(
      take(1),
      delay(1200),
      tap(bookings => {
        this._bookings.next(bookings.concat(booking));
      })
    );
  }

  cancelBooking(bookingId: string) {
    return this._bookings.pipe(
      take(1),
      delay(1200),
      tap(bookings => {
        this._bookings.next(bookings.filter(booking => booking.id !== bookingId))
      })
    );
  }
}
