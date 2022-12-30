import { Component } from '@angular/core';
import { LoadingOverlayService } from '@kirbydesign/designsystem';
import exampleHtml from '../../examples/loading-overlay-example/loading-overlay-example.component.html?raw';
import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { loadingOverlayServiceExample } from '../../examples/loading-overlay-example/loading-overlay-service-example';
@Component({
  selector: 'cookbook-loading-overlay-showcase',
  templateUrl: './loading-overlay-showcase.component.html',
  styleUrls: ['./loading-overlay-showcase.component.scss'],
})
export class LoadingOverlayShowcaseComponent {
  constructor(private loadingOverlayService: LoadingOverlayService) {}

  exampleHtml = exampleHtml;
  loadingOverlayServiceExample = loadingOverlayServiceExample;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'isLoading',
      description: 'Shows the loading spinner.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'showBackdrop',
      description: 'Adds a dimmer on the background.',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'hideContent',
      description: 'Hides the content behind a backdrop with 100% opacity.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];

  public showFullscreenLoadingOverlay(showBackdrop: boolean, hideContent?: boolean) {
    this.loadingOverlayService.showLoadingOverlay(showBackdrop, hideContent);

    setTimeout(() => {
      this.loadingOverlayService.hideLoadingOverlay();
    }, 5000);
  }
}
