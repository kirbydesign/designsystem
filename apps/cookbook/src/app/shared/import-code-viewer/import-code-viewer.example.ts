import { Component } from '@angular/core';
import { ImportCodeViewerComponent } from './import-code-viewer.component';

/**
 * Example usage of ImportCodeViewerComponent
 * This file demonstrates different ways to use the component
 */

@Component({
  selector: 'cookbook-import-code-viewer-example',
  template: `
    <div class="example-container">
      <h2>Single Import</h2>
      <cookbook-import-code-viewer [imports]="'CardComponent'"></cookbook-import-code-viewer>

      <h2>Multiple Imports from Same Package</h2>
      <cookbook-import-code-viewer
        [imports]="['CardComponent', 'CardHeaderComponent', 'CardFooterComponent']"
      ></cookbook-import-code-viewer>

      <h2>Multiple Imports from Different Packages</h2>
      <cookbook-import-code-viewer
        [imports]="['CardComponent', 'ButtonComponent', 'IconModule', 'AvatarComponent']"
      ></cookbook-import-code-viewer>

      <h2>Complex Example with Various Components</h2>
      <cookbook-import-code-viewer [imports]="complexImports"></cookbook-import-code-viewer>

      <h2>Modal and Toast Controllers</h2>
      <cookbook-import-code-viewer
        [imports]="['ModalController', 'ModalConfig', 'ToastController', 'ToastConfig']"
      ></cookbook-import-code-viewer>

      <h2>List Components</h2>
      <cookbook-import-code-viewer
        [imports]="['ListModule', 'ItemModule', 'ListComponent']"
      ></cookbook-import-code-viewer>
    </div>
  `,
  imports: [ImportCodeViewerComponent],
})
export class ImportCodeViewerExampleComponent {
  complexImports = [
    'CardComponent',
    'CardHeaderComponent',
    'ButtonComponent',
    'IconModule',
    'ListModule',
    'ItemModule',
    'AccordionModule',
    'ToastController',
    'ModalController',
  ];
}
