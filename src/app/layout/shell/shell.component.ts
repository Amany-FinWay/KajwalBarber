import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [SidebarComponent, TopbarComponent, RouterModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {

}
