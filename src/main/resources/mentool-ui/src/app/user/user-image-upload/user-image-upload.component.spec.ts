import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageUploadComponent } from './user-image-upload.component';

describe('UserImageUploadComponent', () => {
  let component: UserImageUploadComponent;
  let fixture: ComponentFixture<UserImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
