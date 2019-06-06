import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Some Dummy Place 0010',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      1200.00,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'u1'
    ),
    new Place(
      'p2',
      'Some Dummy Place 0011',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      1547.00,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'u1'
    ),
    new Place(
      'p3',
      'Some Dummy Place 0012',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      123.00,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'u1'
    ),
    new Place(
      'p4',
      'Some Dummy Place 0013',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      1456.00,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'u2'
    )
  ]);

  constructor(
    private authService: AuthService
  ) { }

  get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  getPlaceById(id: string): Observable<Place> {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(place => place.id === id) };
      })
    );
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const place = new Place(
      Math.random().toString(),
      title,
      description,
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.places
      .pipe(
        take(1),
        delay(2000),
        tap(places => {
          this._places.next([...places, place]);
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(2000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(place => placeId === place.id);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];

        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );

        this._places.next(updatedPlaces);
      })
    );
  }
}
