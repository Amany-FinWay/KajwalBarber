import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  standalone: true,
})
export class TopbarComponent {
  constructor(
    public authService: AuthService
  ) {}
}
