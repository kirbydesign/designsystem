import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRecieverComponent } from './choose-reciever.component';

describe('ListOfRecieverComponent', () => {
  let component: ChooseRecieverComponent;
  let fixture: ComponentFixture<ChooseRecieverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseRecieverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRecieverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
