import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SekeerSelectComponent } from './sekeer-select.component';

describe('SekeerSelectComponent', () => {
  let component: SekeerSelectComponent;
  let fixture: ComponentFixture<SekeerSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SekeerSelectComponent]
    });
    fixture = TestBed.createComponent(SekeerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
