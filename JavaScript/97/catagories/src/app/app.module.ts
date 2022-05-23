import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CatagorieFormComponent } from './components/catagorie-form/catagorie-form.component';
import { ItemsListComponent } from './components/items-list/items-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CatagorieFormComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
