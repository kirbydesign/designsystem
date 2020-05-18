/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VirtualScrollListComponent } from './virtual-scroll-list.component';

describe('VirtualScrollListComponent', () => {
  let component: VirtualScrollListComponent;
  let fixture: ComponentFixture<VirtualScrollListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualScrollListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
