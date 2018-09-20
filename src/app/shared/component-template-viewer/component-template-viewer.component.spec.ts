import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTemplateViewerComponent } from './component-template-viewer.component';

describe('ComponentTemplateViewerComponent', () => {
  let component: ComponentTemplateViewerComponent;
  let fixture: ComponentFixture<ComponentTemplateViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentTemplateViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTemplateViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
