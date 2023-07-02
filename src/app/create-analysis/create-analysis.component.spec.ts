import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnalysisComponent } from './create-analysis.component';

describe('CreateAnalysisComponent', () => {
  let component: CreateAnalysisComponent;
  let fixture: ComponentFixture<CreateAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAnalysisComponent]
    });
    fixture = TestBed.createComponent(CreateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
