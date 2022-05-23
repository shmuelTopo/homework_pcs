import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithRandomComponent } from './input-with-random.component';

describe('InputWithRandomComponent', () => {
  let component: InputWithRandomComponent;
  let fixture: ComponentFixture<InputWithRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
