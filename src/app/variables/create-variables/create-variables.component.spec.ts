import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVariablesComponent } from './create-variables.component';

describe('CreateVariablesComponent', () => {
  let component: CreateVariablesComponent;
  let fixture: ComponentFixture<CreateVariablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVariablesComponent]
    });
    fixture = TestBed.createComponent(CreateVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
