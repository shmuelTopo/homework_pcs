import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/catagoriesModel';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  @Input() items: Item[] | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
