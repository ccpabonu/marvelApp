import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBootstrapModalComponent } from './modal-comic.component';

describe('MyBootstrapModalComponent', () => {
  let component: MyBootstrapModalComponent;
  let fixture: ComponentFixture<MyBootstrapModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBootstrapModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBootstrapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
