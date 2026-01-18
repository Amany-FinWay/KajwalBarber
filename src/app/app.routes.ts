import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BarbersComponent } from './features/barbers/barbers.component';
import { PackagesComponent } from './features/packages/packages.component';
import { BookingsComponent } from './features/bookings/bookings.component';
import { LoginComponent } from './features/login/login.component';
import { ShellComponent } from './layout/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'barbers', component: BarbersComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
