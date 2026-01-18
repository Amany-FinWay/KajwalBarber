import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { SpinnerToasterService } from '../../core/services/spinner-toaster.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div 
      *ngIf="spinnerToasterService.spinner$ | async" 
      class="fixed inset-0 flex justify-center items-center bg-slate-900/40 backdrop-blur-md z-[100] transition-all duration-500"
    >
      <div class="relative flex flex-col items-center">
        <div class="relative h-20 w-20">
          <div class="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500/20 border-l-transparent animate-spin"></div>
          <div class="absolute inset-2 rounded-full border-4 border-t-transparent border-r-emerald-500 border-b-transparent border-l-emerald-500/20 animate-[spin_1.5s_linear_infinite_reverse]"></div>
          
          <div class="absolute inset-0 flex items-center justify-center">
            <img
              src="assets/barber-cutting-man-hair.png"
              alt="Loading"
              class="h-[25rem] w-[10rem] object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-[spin_6s_linear_infinite]"
            />
          </div>
        </div>

        <div class="mt-6 flex flex-col items-center gap-1">
          <span class="text-xs font-black uppercase tracking-[0.3em] text-white">
            برجاء الانتظار
          </span>
          <div class="flex gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce"></span>
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SpinnerComponent {

  constructor(public spinnerToasterService: SpinnerToasterService) {}
}
