import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[];
  relevantPlaces: Place[];
  otherRelevantPlaces: Place[];
  private placesSub: Subscription;
  private chosenFilter = 'all';

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.filterPlacesWithChosenFilter();
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.chosenFilter = event.detail.value;
    this.filterPlacesWithChosenFilter();
  }

  private filterPlacesWithChosenFilter() {
    this.relevantPlaces = this.chosenFilter === 'all'
      ? this.places
      : this.places.filter(place => place.userId !== this.authService.userId);

    this.otherRelevantPlaces = this.relevantPlaces.slice(1);
  }
}
