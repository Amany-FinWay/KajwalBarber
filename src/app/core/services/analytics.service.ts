import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analytics } from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public Global(): Observable<Analytics> {
    return this.httpClient.post<Analytics>('api/analytics/global', {});
  }
}
