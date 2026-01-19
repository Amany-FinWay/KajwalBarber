import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barber } from '../../core/models/barber.model';
import { BarberService } from '../../core/services/barber.service';
import { SpinnerToasterService } from '../../core/services/spinner-toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barbers',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './barbers.component.html',
  styleUrl: './barbers.component.css'
})
export class BarbersComponent implements OnInit {
  showModal = false;
  barbers: Barber[] = [];

  constructor(
    private barberService: BarberService,
    private spinnerToasterService: SpinnerToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listBarbers();
  }

  barberForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    address: new FormControl('', [Validators.required]),
    commission: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  listBarbers() {
    this.spinnerToasterService.showSpinner();
    this.barberService.ListBarbers().subscribe({
      next: (res: any) => {
          this.spinnerToasterService.hideSpinner();
          this.barbers = res.data;
        },error: (err) => {
          this.spinnerToasterService.hideSpinner();
          if(err.status == 401) {
            this.router.navigate(['/login']);
          }
        }
      
    });
  }

  addBarber() {
    this.spinnerToasterService.showSpinner();
    if (this.barberForm.valid) {
      const barber: Barber = {
        name: this.barberForm.controls['name'].value!,
        address: this.barberForm.controls['address'].value!,
        commission: this.barberForm.controls['commission'].value!,
        phone: this.barberForm.controls['phone'].value!,
        type: 0
      }
      this.barberService.CreateBarber(barber).subscribe({
        next: (res: Barber) => {
          this.spinnerToasterService.hideSpinner();
          this.spinnerToasterService.showToaster("success", "تم إضافة حلاق بنجاح");
          this.showModal = false;
          this.barbers.push(barber);
          this.barberForm.reset();
        },error: (err) => {
          this.spinnerToasterService.hideSpinner();
          if(err.status == 401) {
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }
}
