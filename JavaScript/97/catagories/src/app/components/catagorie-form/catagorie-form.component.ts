import { Component, OnInit } from '@angular/core';
import { Catagories } from 'src/app/models/catagoriesModel';
import { catagoreies } from '../../constant/catagories';

@Component({
  selector: 'catagorie-form',
  templateUrl: './catagorie-form.component.html',
  styleUrls: ['./catagorie-form.component.scss']
})
export class CatagorieFormComponent {
  catagories = catagoreies;
  selected: number = 0;
  newCatagorieName = '';
  selectedCatagorie: Catagories = this.catagories[this.selected];

  onChange() {
    this.selectedCatagorie = this.catagories[this.selected];
    console.log(this.selected, this.selectedCatagorie);
  }

  addCatagorie(catagorieName: string) {
    console.log(catagorieName);
  }

  ngOnInit() {}
}
