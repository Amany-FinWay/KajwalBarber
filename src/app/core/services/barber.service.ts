import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Barber } from '../models/barber.model';
import { Observable } from 'rxjs';
import { CreateCut, CutCreateResponse, CutsList } from '../models/cuts-list.model';

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

  public DeleteBarber(barberId: number) {
    return this.httpClient.post(`${'/api/employees/delete-'}${barberId}`, {});
  }

  public CreateCut(cut: CreateCut): Observable<CutCreateResponse> {
    return this.httpClient.post<CutCreateResponse>('/api/cuts/create', cut);
  }

  public CutList(): Observable<CutsList>{
    return this.httpClient.post<CutsList>('/api/cuts/get-today-business', {})
  }

  public CutListOnDay(dateTime: any): Observable<CutsList>{
    return this.httpClient.post<CutsList>(`${'/api/cuts/get-business-day?date='}${dateTime}`, {})
  }

  public DeleteCut(cutId: number) {
    return this.httpClient.post(`${'/api/cuts/delete-'}${cutId}`, {});
  }
}
