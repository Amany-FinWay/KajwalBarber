import { Component, OnInit } from '@angular/core';
import { CutsComponent } from '../cuts/cuts.component';
import { Analytics } from '../../core/models/analytics.model';
import { AnalyticsService } from '../../core/services/analytics.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CutsComponent, CommonModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats!: Analytics;

  constructor(
    private analyticsService: AnalyticsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.analyticsService.Global().subscribe({
      next: (res: any) => {
        this.stats = res.data;
        console.log(this.stats);
        
      },error: (err) => {
        if(err.status == 401) {
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
