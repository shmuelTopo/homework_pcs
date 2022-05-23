import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-with-random',
  templateUrl: './input-with-random.component.html',
  styleUrls: ['./input-with-random.component.scss']
})
export class InputWithRandomComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() getRandom!: () => string;
  @Output() inputSubmit = new EventEmitter<string>();

  inputValue = '';

  emit(value?: string) {
    this.inputSubmit.emit(value || this.inputValue);
    this.inputValue = '';
  }

  randomInput() {
    this.emit(this.getRandom());
  }
}
