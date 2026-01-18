import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerToasterService {
  constructor() {}

  private _spinner = new BehaviorSubject<boolean>(false);
  spinner$ = this._spinner.asObservable();

  private _toaster = new BehaviorSubject<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);
  toaster$ = this._toaster.asObservable();

  showSpinner() {
    this._spinner.next(true);
  }

  hideSpinner() {
    this._spinner.next(false);
  }

  showToaster(type: 'success' | 'error', message: string) {
    this._toaster.next({ type, message });

    setTimeout(() => this._toaster.next(null), 3000);
  }
}
