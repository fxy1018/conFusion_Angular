import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/Observable/of'

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
   return this.restangular.one('dishes', id).get();
 }

 getFeaturedDish(): Observable<Dish> {
   return this.restangular.all('dishes').getList({feature: true})
    .map(dishes => dishes[0]);
 }

 getDishIds(): Observable<number[]> {
   return this.getDishes()
    .map(dishes => {return dishes.map(dish => dish.id)})
    .catch(error => {return error; });
 }
}
