import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configSubject = new BehaviorSubject<any>(null);

  async load(): Promise<void> {
    console.log('[ConfigService] Loading config.json via fetch...');
    try {
      const response = await fetch('/assets/config.json');
      const data = await response.json();
      this.configSubject.next(data);
      console.log('[ConfigService] Config loaded successfully:', data);
    } catch (err) {
      console.error('[ConfigService] Failed to load config:', err);
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