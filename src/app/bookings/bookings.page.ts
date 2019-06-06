import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];
  private bookingsSub: Subscription;

  constructor(
    private bookingsService: BookingsService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.bookingsSub = this.bookingsService.bookings.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  onCancelBooking(bookingId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();

    this.loadingCtrl
      .create({
        spinner: 'dots',
        message: 'Canceling booking...'
      })
      .then(el => {
        el.present();

        this.bookingsService
          .cancelBooking(bookingId)
          .subscribe(() => {
            el.dismiss();
          });
      });
  }
}
