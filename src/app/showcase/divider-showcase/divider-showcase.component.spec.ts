import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerShowcaseComponent } from './divider-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CodeViewerComponent } from '~/app/shared/code-viewer/code-viewer.component';

describe('DividerShowcaseComponent', () => {
  let component: DividerShowcaseComponent;
  let fixture: ComponentFixture<DividerShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [DividerShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
