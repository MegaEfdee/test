import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadxlsComponent } from './uploadxls.component';

describe('UploadxlsComponent', () => {
  let component: UploadxlsComponent;
  let fixture: ComponentFixture<UploadxlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadxlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadxlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
