/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TabsShowcaseComponent } from './tabs-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { CodeViewerComponent } from '~/app/shared/code-viewer/code-viewer.component';

describe('TabsShowcaseComponent', () => {
  let component: TabsShowcaseComponent;
  let fixture: ComponentFixture<TabsShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [TabsShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
