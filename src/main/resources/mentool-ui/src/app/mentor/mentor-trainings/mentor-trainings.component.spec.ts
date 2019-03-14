import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorTrainingsComponent } from './mentor-trainings.component';

describe('MentorTrainingsComponent', () => {
  let component: MentorTrainingsComponent;
  let fixture: ComponentFixture<MentorTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
