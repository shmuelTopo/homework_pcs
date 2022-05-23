import { Component, OnInit } from '@angular/core';
import { people } from '../../constants/people';
import { Person } from '../../models/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  people: Person[] = people;
  constructor() { }

  ngOnInit(): void {
  }

}
