import { Component, OnInit } from '@angular/core';
import { BarberService } from '../../core/services/barber.service';
import { Barber } from '../../core/models/barber.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SpinnerToasterService } from '../../core/services/spinner-toaster.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { CreateCut, CutsList } from '../../core/models/cuts-list.model';

@Component({
  selector: 'app-cuts',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, CommonModule],
  templateUrl: './cuts.component.html',
  styleUrl: './cuts.component.css',
})
export class CutsComponent implements OnInit {
  allBarbers: Barber[] = [];

  allCuts!: CutsList;
  dailyGroups: any[] = [];
  rowsArray: number[] = [];
  filteredEmployees: any[] = [];
  showEmployeeDropdown = false;
  serviceForm!: FormGroup;

  constructor(
    private barberService: BarberService,
    private spinnerToasterService: SpinnerToasterService,
  ) {}

  ngOnInit(): void {
    this.getCuts();
    this.serviceForm = new FormGroup({
      employeeId: new FormControl(0, [Validators.required]),
      employeeName: new FormControl('', [Validators.required]),
      serviceName: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      clientName: new FormControl(''),
      commission: new FormControl(null),
    });
    this.barberService.ListBarbers().subscribe((res: any) => (this.allBarbers = res.data));
  }

  getCuts() {
    this.spinnerToasterService.showSpinner()
    this.barberService.CutList().subscribe((res: any) => {this.allCuts = res.data; this.groupCutsByBarber(this.allCuts); this.spinnerToasterService.hideSpinner()});
  }

  onEmployeeInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredEmployees = this.allBarbers.filter((e) =>
      e.name.toLowerCase().includes(query),
    );
    this.showEmployeeDropdown = this.filteredEmployees.length > 0;
  }

  onEmployeeInputChange() {
    const name = this.serviceForm.get('employeeName')?.value;
    const found = this.allBarbers.find((e) => e.name === name);
    const commissionControl = this.serviceForm.controls['commission'];

    if (found) {
      commissionControl.setValue(null);
      commissionControl.clearValidators();
      this.serviceForm.patchValue({ employeeId: found.id }, { emitEvent: false });
    } else {
      this.serviceForm.patchValue({ employeeId: 0 }, { emitEvent: false });
      
      commissionControl.setValidators([Validators.required, Validators.min(0)]);
    }

    commissionControl.updateValueAndValidity();
    this.serviceForm.updateValueAndValidity();
  }

  selectEmployee(emp: any) {
    debugger
    this.serviceForm.patchValue({
      employeeId: emp.id,
      employeeName: emp.name,
    });
    this.showEmployeeDropdown = false;
    this.serviceForm.controls['commission'].clearValidators();
    this.serviceForm.controls['commission'].updateValueAndValidity();;
    this.serviceForm.updateValueAndValidity();
  }

  getBusinessDate(): string {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 0 && hours < 8) {
      now.setDate(now.getDate() - 1);
      now.setHours(23, 0, 0);
    }

    return now.toISOString();
  }

  async onSubmitService() {
    if (this.serviceForm.invalid) return;
    const formVal = this.serviceForm.value;
    let empId = formVal.employeeId;
    if (empId === 0) {
      const newBarber: Barber = {
        name: formVal.employeeName!,
        commission: formVal.commission || 0,
        type: 0,
        phone: '01000000000',
        address: 'غير محدد',
      };
      try {
        const createdBarber = await lastValueFrom(
          this.barberService.CreateBarber(newBarber),
        );

        if (createdBarber && createdBarber.id) {
          empId = createdBarber.id;
          this.allBarbers.push(createdBarber);
        }
      } catch (err) {
        this.spinnerToasterService.showToaster(
          'error',
          'تعذر إضافة الحلاق الجديد، تأكد من البيانات',
        );
        return;
      }
    }

    this.executeCreateCut(empId!);
  }

  executeCreateCut(empId: number) {
    this.spinnerToasterService.showSpinner();
    const cutData: CreateCut = {
      employeeId: empId,
      serviceName: this.serviceForm.get('serviceName')?.value!,
      price: this.serviceForm.get('price')?.value!,
      clientName: this.serviceForm.get('clientName')?.value || 'عميل مجهول',
      businessDate: new Date(this.getBusinessDate()),
    };

    this.barberService.CreateCut(cutData).subscribe({
      next: (res) => {
        this.spinnerToasterService.showToaster("success", 'تم تسجيل العملية بنجاح');
        this.serviceForm.reset({
          employeeId: 0,
          employeeName: '',
          serviceName: '',
          price: null,
          clientName: '',
          commission: null,
        });
        //this.allCuts.push(res);
        this.groupCutsByBarber(this.allCuts);
        this.spinnerToasterService.hideSpinner();
      },
      error: (err) => {
        this.spinnerToasterService.hideSpinner();
        this.spinnerToasterService.showToaster("error" ,'حدث خطأ أثناء حفظ العملية، حاول مرة أخرى');
        console.error(err);
      },
    });
  }

  get maxCutsCount(): number {
    return Math.max(...this.dailyGroups.map(e => e.cuts.length));
  }

  groupCutsByBarber(apiResponse: any) {
    const employees = apiResponse.employees || [];
    this.dailyGroups = employees;

    // حساب أقصى عدد عمليات عند أي حلاق لتحديد عدد صفوف الجدول
    const maxCuts = Math.max(...employees.map((e: any) => e.cuts?.length || 0), 0);
    
    // تحويل الرقم لمصفوفة [0, 1, 2, ...] عشان الـ @for يشتغل
    this.rowsArray = Array.from({ length: maxCuts }, (_, i) => i);
  }
}
