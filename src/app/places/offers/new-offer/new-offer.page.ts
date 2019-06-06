import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private placesService: PlacesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }),
      description: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(200)]
      }),
      price: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.min(1)
        ]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      })
    });
  }

  onCreateOffer() {
    if (this.form.invalid) {
      return;
    }

    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Creating place...'
    }).then(el => {
      el.present();

      this.placesService
        .addPlace(
          this.form.value.title,
          this.form.value.description,
          +this.form.value.price,
          new Date(this.form.value.dateFrom),
          new Date(this.form.value.dateTo),
        )
        .subscribe(
          () => {
            el.dismiss();
            this.form.reset();
            this.navCtrl.navigateBack('/places/tabs/offers');
          }
        );
    });
  }
}
