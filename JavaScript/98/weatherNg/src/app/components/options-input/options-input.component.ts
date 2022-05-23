import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from '../../models/options';

@Component({
  selector: 'options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss']
})
export class OptionsInputComponent implements OnInit {
  @Input() options!: Option[];
  @Input() label = 'Select an option';
  @Output() valueChange = new EventEmitter<Option>();
  selected = 0;

  ngOnInit(): void {
    this.emit();
  }

  emit(){
    this.valueChange.emit(this.options[this.selected]);
    console.log(this.options[this.selected]);
  }

}
