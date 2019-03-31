import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  @Input()
  imageUrl: string;
  @Input()
  description: string;
  @Input()
  readOnly: boolean = true;

  @Output()
  descriptionChange: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onInputChange(value: string) {
    this.descriptionChange.emit(this.description);
  }
}
