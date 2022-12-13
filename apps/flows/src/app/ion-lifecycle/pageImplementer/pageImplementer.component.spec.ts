/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageImplementer } from './pageImplementer.component';

describe('PageImplementerComponent', () => {
  let component: PageImplementer;
  let fixture: ComponentFixture<PageImplementer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageImplementer],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageImplementer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
