import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configSubject = new BehaviorSubject<any>(null);

  async load(): Promise<void> {
    try {
      const response = await fetch('/assets/config.json');
      const data = await response.json();
      this.configSubject.next(data);
    } catch (err) {
    }
  }

  get config$(): Observable<any> {
    return this.configSubject.asObservable().pipe(
      filter(c => c !== null),
      take(1)
    );
  }

  get serverUrl(): string {
    return this.configSubject.value?.serverUrl || '';
  }
}