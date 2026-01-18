import { Component } from '@angular/core';
import { CutsComponent } from '../cuts/cuts.component';

@Component({
  selector: 'app-dashboard',
  imports: [CutsComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
