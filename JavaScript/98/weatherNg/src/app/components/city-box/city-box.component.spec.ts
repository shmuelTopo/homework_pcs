import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBoxComponent } from './city-box.component';

describe('CityBoxComponent', () => {
  let component: CityBoxComponent;
  let fixture: ComponentFixture<CityBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
