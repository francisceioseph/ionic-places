import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      const placeId = paramMap.get('placeId');
      this.place = this.placesService.getPlaceById(placeId);
      this.form = this.initFormGroup(this.place);
    });
  }

  getDefaultHref() {
    return `/places/tabs/offers/${this.place.id}`;
  }

  onUpdateOffer() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
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
