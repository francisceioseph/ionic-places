import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      const placeId = paramMap.get('placeId');

      this.placeSub = this.placesService.getPlaceById(placeId).subscribe(place => {
        this.place = place;
        this.form = this.initFormGroup(place);
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  getDefaultHref() {
    return `/places/tabs/offers/${this.place.id}`;
  }

  onUpdateOffer() {
    if (this.form.invalid) {
      return;
    }

    this.loadingCtrl
      .create({
        spinner: 'dots',
        message: 'Updating place...'
      })
      .then(el => {
        el.present();

        this.placesService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            el.dismiss();
            this.form.reset();
            this.navCtrl.navigateBack('/places/tabs/offers');
          });
      });


  }

  private initFormGroup(place: Place): FormGroup {
    return new FormGroup({
      title: new FormControl(place.title, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }),
      description: new FormControl(place.description, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(200)]
      }),
      price: new FormControl(place.price, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.min(1)
        ]
      }),
    });
  }
}
