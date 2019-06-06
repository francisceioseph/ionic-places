import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      if (!paramsMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      const placeId = paramsMap.get('placeId');
      this.place = this.placesService.getPlaceById(placeId);
    });
  }

  onBookPlace() {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          place: this.place
        }
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(result => {
        if (result.role === 'confirm') {
          console.log(result.data);
        }
      });
  }
}
