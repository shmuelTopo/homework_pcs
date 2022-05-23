import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagorieFormComponent } from './catagorie-form.component';

describe('CatagorieFormComponent', () => {
  let component: CatagorieFormComponent;
  let fixture: ComponentFixture<CatagorieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagorieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagorieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
