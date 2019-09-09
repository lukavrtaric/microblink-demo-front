import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent {

  constructor() { }

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  diameter = 30;
}
