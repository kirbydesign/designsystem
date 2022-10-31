import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseReceiverComponent } from './choose-receiver.component';

describe('ListOfRecieverComponent', () => {
  let component: ChooseReceiverComponent;
  let fixture: ComponentFixture<ChooseReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseReceiverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
