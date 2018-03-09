import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForDariaComponent } from './for-daria.component';

describe('ForDariaComponent', () => {
  let component: ForDariaComponent;
  let fixture: ComponentFixture<ForDariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForDariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForDariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
