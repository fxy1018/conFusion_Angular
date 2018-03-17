import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/Observable/of'

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get(baseURL + 'dishes')
      .map(res => {return this.processHttpmsgService.extractData(res)})
      .catch(error => {return this.processHttpmsgService.handleError(error)})

    // return new Promise(resolve => {
    //   //Simulate server laterncy with 2 second delay
    //   setTimeout(()=> resolve(DISHES), 2000);
    // })
  }

  getDish(id: number): Observable<Dish> {
   return this.http.get(baseURL + 'dishes/' + id)
    .map(res => {return this.processHttpmsgService.extractData(res)})
    .catch(error => {return this.processHttpmsgService.handleError(error)})
   // return new Promise(resolve => {
   //   //Simulate server laterncy with 2 second delay
   //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
   //
   // });

 }

 getFeaturedDish(): Observable<Dish> {
   return this.http.get(baseURL + 'dishes?feature=true' )
    .map(res => {return this.processHttpmsgService.extractData(res)[0]})
    .catch(error => {return this.processHttpmsgService.handleError(error)})
   // return new Promise(resolve=>{
   //   setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
   // });
 }

 getDishIds(): Observable<number[]> {
   return this.getDishes()
    .map(dishes => {return dishes.map(dish => dish.id)})
    .catch(error => {return error; });
 }
}
