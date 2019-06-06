import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() place: Place;
  @ViewChild('f') form: NgForm;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  onBookPlace() {
    if (this.form.invalid || this.isDateRangeInvalid()) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          guestNumber: this.form.value.guestNumber,
          dateFrom: new Date(this.form.value.dateFrom),
          dateTo: new Date(this.form.value.dateT),
        }
      }, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  isDateRangeValid() {
    const startDate = new Date(this.form.value.dateFrom);
    const endDate = new Date(this.form.value.dateTo);

    return endDate > startDate;
  }

  isDateRangeInvalid() {
    return !this.isDateRangeValid();
  }
}
