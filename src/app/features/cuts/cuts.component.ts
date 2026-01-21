import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarberService } from '../../core/services/barber.service';
import { Barber } from '../../core/models/barber.model';
import { Router } from '@angular/router';
import { CreateCut } from '../../core/models/cuts-list.model';
import { SpinnerToasterService } from '../../core/services/spinner-toaster.service';

@Component({
  selector: 'app-cuts',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './cuts.component.html',
  styleUrl: './cuts.component.css',
})
export class CutsComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<void>();
  allBarbers: Barber[] = [];
  dailyGroups: any[] = [];

  newRow: number[] = [];

  constructor(
    private barberService: BarberService,
    private spinnerToasterService: SpinnerToasterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadBarbers();
    this.loadTodayCuts();
  }

  loadBarbers() {
    this.barberService.ListBarbers().subscribe({
      next: (res: any) => {
        this.allBarbers = res.data;
        this.loadTodayCuts(); // مهم تيجي بعد الحلاقين
      },
      error: () => {
        this.spinnerToasterService.showToaster('error', 'فشل تحميل الحلاقين');
      },
    });
  }

  loadTodayCuts() {
    this.barberService.CutList().subscribe({
      next: (res: any) => {
        const apiEmployees = res.data.employees || [];
        this.mergeApiCutsWithAllBarbers(apiEmployees);
      },
      error: () => {
        this.spinnerToasterService.showToaster(
          'error',
          'فشل تحميل عمليات اليوم',
        );
      },
    });
  }

  mergeApiCutsWithAllBarbers(apiEmployees: any[]) {
    this.dailyGroups = this.allBarbers.map((b) => {
      const apiEmp = apiEmployees.find((e) => e.employeeId === b.id);

      return {
        employeeId: b.id,
        employeeName: b.name,
        commissionRate: b.commission || 2,
        cuts: apiEmp?.cuts || [],
        grossRevenue: apiEmp?.grossRevenue || 0,
        commissionAmount: apiEmp?.commissionAmount || 0,
        netRevenue: apiEmp?.netRevenue || 0,
        fixedAmount: apiEmp?.fixedAmount || 0,
      };
    });

    this.dailyGroups.forEach((emp) => {
      emp.cuts.sort(
        (a: any, b: any) =>
          new Date(a.time).getTime() - new Date(b.time).getTime(),
      );
    });
  }

  buildEmptyTable() {
    this.dailyGroups = this.allBarbers.map((b) => ({
      employeeId: b.id,
      employeeName: b.name,
      commissionRate: b.commission || 2,
      cuts: [],
      grossRevenue: 0,
      commissionAmount: 0,
      netRevenue: 0,
    }));
  }

  mergeCutsIntoTable(apiEmployees: any[]) {
    this.buildEmptyTable();

    apiEmployees.forEach((apiEmp: any) => {
      const localEmp = this.dailyGroups.find(
        (e) => e.employeeId === apiEmp.employeeId,
      );

      if (localEmp) {
        localEmp.cuts = apiEmp.cuts || [];
      }
    });

    this.recalculateTotals();
  }

  get maxCutsCount(): number {
    if (!this.dailyGroups?.length) return 0;
    return Math.max(...this.dailyGroups.map((e) => e.cuts.length));
  }

  getBusinessDate(): Date {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 8) {
      const d = new Date(now);
      d.setDate(d.getDate() - 1);
      d.setHours(23, 0, 0, 0);
      return d;
    }

    return now;
  }

  saveNewRow() {
    const hasAnyValue = this.newRow.some((v) => v && v > 0);
    if (!hasAnyValue) return;

    const businessDate = this.getBusinessDate();
    this.spinnerToasterService.showSpinner();

    const requests: Promise<any>[] = [];

    this.dailyGroups.forEach((emp, index) => {
      const value = Number(this.newRow[index]);

      if (value && value > 0) {
        const cut: CreateCut = {
          employeeId: emp.employeeId,
          serviceName: 'دفتر يومية',
          price: value,
          clientName: '',
          businessDate,
          cutDateTime: new Date(),
        };

        requests.push(this.barberService.CreateCut(cut).toPromise());
      }
    });

    Promise.all(requests)
      .then(() => {
        this.spinnerToasterService.showToaster(
          'success',
          'تم حفظ العمليات بنجاح',
        );
        this.newRow = [];
        this.loadTodayCuts();
        this.dataChanged.emit();
      })
      .catch(() => {
        this.spinnerToasterService.showToaster('error', 'حصل خطأ أثناء الحفظ');
      })
      .finally(() => {
        this.spinnerToasterService.hideSpinner();
      });
  }

  recalculateTotals() {
    this.dailyGroups.forEach((emp: any) => {
      emp.grossRevenue = emp.cuts.reduce(
        (sum: number, c: any) => sum + (c.price || 0),
        0,
      );
      const commissionPercent = emp.commissionRate || 2;
      emp.commissionAmount = emp.grossRevenue * (commissionPercent / 100);
      emp.netRevenue = emp.grossRevenue - emp.commissionAmount;
    });
  }
}
