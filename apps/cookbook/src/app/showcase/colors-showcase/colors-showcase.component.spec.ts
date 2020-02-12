import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { ColorsShowcaseComponent } from './colors-showcase.component';

describe('ColorsShowcaseComponent', () => {
  let component: ColorsShowcaseComponent;
  let fixture: ComponentFixture<ColorsShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [ColorsShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onColorClick when clicking a color box', () => {
    spyOn(component, 'onColorClick').and.callThrough();
    const colorElm = fixture.debugElement.nativeElement.querySelector('.color-box');
    colorElm.click();
    expect(component.onColorClick).toHaveBeenCalledWith(jasmine.any(Object));
    expect(component.selectedColor).toBe(component.brandColors[0].name);
    expect(component.selectedOnColor).toBe(component.brandColors[0].contrast.name);
  });
});
