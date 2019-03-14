import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css']
})
export class RequiredComponent implements OnInit {
  @Input() form: FormControl;
  @Input() errorMessage: string;
  constructor() {
  }

  ngOnInit() {
  }

}
