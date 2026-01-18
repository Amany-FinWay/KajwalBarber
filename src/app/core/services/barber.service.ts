import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Barber } from '../models/barber.model';
import { Observable } from 'rxjs';
import { CreateCut, CutsList } from '../models/cuts-list.model';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public CreateBarber(barber: Barber): Observable<Barber> {
    return this.httpClient.post<Barber>('/api/employees/create', barber);
  }

  public ListBarbers(): Observable<Barber[]> {
    return this.httpClient.post<Barber[]>('/api/employees/get-all', {});
  }

  public CreateCut(cut: CreateCut) {
    return this.httpClient.post('/api/cuts/create', cut);
  }

  public CutList(dateTime: any): Observable<CutsList>{
    return this.httpClient.post<CutsList>(`${'/api/cuts/get-business-day?date='}${dateTime}`, {})
  }
}
