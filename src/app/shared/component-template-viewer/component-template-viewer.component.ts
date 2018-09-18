import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'kirby-component-template-viewer',
  templateUrl: './component-template-viewer.component.html',
  styleUrls: ['./component-template-viewer.component.scss']
})
export class ComponentTemplateViewerComponent implements OnInit, AfterViewChecked {
  @Input() component: Object;
  htmlTemplate: string;
  constructor() { }

  ngOnInit() {
    const constructor = this.component instanceof Function
                      ? this.component
                      : this.component.constructor;
    this.htmlTemplate = this.getComponentTemplate(constructor);
  }

  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  private getComponentTemplate(target: Function): string {
    const componentDecorator = this.getComponentDecorator(target);
    return componentDecorator ? componentDecorator.template : undefined;
  }

  private getComponentDecorator(target: Function): Component {
    const annotations = target['__annotations__'];
    let decorator: Component;
    if (Array.isArray(annotations)) {
      decorator = annotations.find(x => x.ngMetadataName === 'Component');
    }
    return decorator;
  }

}
