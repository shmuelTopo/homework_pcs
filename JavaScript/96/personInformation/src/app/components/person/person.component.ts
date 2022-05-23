import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../models/person';
@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: Person | null = null;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('hi there');
      console.log('person', this.person);
    }, 1000);
    
  }

}
