/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToolbarShowcaseComponent } from './toolbar-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { CodeViewerComponent } from '~/app/shared/code-viewer/code-viewer.component';

describe('ToolbarShowcaseComponent', () => {
  let component: ToolbarShowcaseComponent;
  let fixture: ComponentFixture<ToolbarShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule],
      declarations: [ToolbarShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
