import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComparableComponent } from './create-comparable.component';

describe('CreateComparableComponent', () => {
  let component: CreateComparableComponent;
  let fixture: ComponentFixture<CreateComparableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComparableComponent]
    });
    fixture = TestBed.createComponent(CreateComparableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
