import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatInput} from "@angular/material";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Output() dateEmitter: EventEmitter<any> = new EventEmitter<any>();
  selectedDate: any;
  @Input() selectDatePlaceHolder: string;

  @ViewChild('dateInput', {
    read: MatInput
  }) dateInput: MatInput;

  constructor() { }

  ngOnInit() {
  }

  emitDateChanged(changedDate: MatDatepickerInputEvent<any>) {
    this.dateEmitter.emit(changedDate.value);
  }

  unselect() {
    this.dateEmitter.emit(null);
    this.selectedDate = undefined;
  }
}
