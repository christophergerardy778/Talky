import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInErrorDialogComponent } from './sign-in-error-dialog.component';

describe('SignInErrorDialogComponent', () => {
  let component: SignInErrorDialogComponent;
  let fixture: ComponentFixture<SignInErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
