import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGalleryImageComponent } from './user-gallery-image.component';

describe('UserGalleryImageComponent', () => {
  let component: UserGalleryImageComponent;
  let fixture: ComponentFixture<UserGalleryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGalleryImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGalleryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
