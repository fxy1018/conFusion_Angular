import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Rx';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';


import 'rxjs/add/Observable/of'
import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
  private processHttpmsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();

  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();

  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .map(promotions => promotions[0]);

  }
}
