import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Some Dummy Place 0010',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      1200.00,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p2',
      'Some Dummy Place 0011',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      1547.00,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p3',
      'Some Dummy Place 0012',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      123.00,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p4',
      'Some Dummy Place 0013',
      'Some very fun place made just for this',
      'https://trendmakerhomes.com/wp-content/uploads/sites/7/2018/10/Home-page-CCR80-Hero-2.jpg',
      1456.00,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )
  ];

  constructor() { }

  get places(): Place[] {
    return [...this._places];
  }

  getPlaceById(id: string) {
    return {
      ...this._places.find(p => p.id === id)
    };
  }
}
