import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `<button
    class="text-black max-w-[100px] px-5 py-2 rounded-xl shadow-md hover:bg-slate-200"
    (click)="btnClicked.emit()"
  >
    {{ label() }}
  </button>`,
  styles: ``,
})
export class ButtonComponent {
  label = input('');
  btnClicked = output();
}
