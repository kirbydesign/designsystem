/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarShowcaseComponent } from './toolbar-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { CodeViewerComponent } from '~/app/shared/code-viewer/code-viewer.component';

describe('ToolbarShowcaseComponent', () => {
  let component: ToolbarShowcaseComponent;
  let fixture: ComponentFixture<ToolbarShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
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
