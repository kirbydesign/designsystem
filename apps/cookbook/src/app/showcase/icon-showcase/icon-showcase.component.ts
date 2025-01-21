import { Component } from '@angular/core';
import { defaultIcons, IconSize } from '@kirbydesign/designsystem';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { IconDefaultExampleComponent as IconDefaultExampleComponent_1 } from '../../examples/icon-example/examples/default';
import { IconSizesExampleComponent as IconSizesExampleComponent_1 } from '../../examples/icon-example/examples/sizes';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { IconCustomExampleComponent as IconCustomExampleComponent_1 } from '../../examples/icon-example/examples/custom';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { IconSizesExampleComponent } from '~/app/examples/icon-example/examples/sizes';
import { IconDefaultExampleComponent } from '~/app/examples/icon-example/examples/default';
import { IconCustomExampleComponent } from '~/app/examples/icon-example/examples/custom';

@Component({
  selector: 'cookbook-icon-showcase',
  templateUrl: './icon-showcase.component.html',
  styleUrls: ['./icon-showcase.component.scss'],
  preserveWhitespaces: true,
  imports: [
    DividerComponent,
    ExampleViewerComponent,
    IconDefaultExampleComponent_1,
    IconSizesExampleComponent_1,
    CodeViewerComponent,
    IconCustomExampleComponent_1,
    ApiDescriptionPropertiesComponent,
  ],
})
export class IconShowcaseComponent {
  defaultHtmlSnippet = IconDefaultExampleComponent.htmlSnippet;
  sizesHtmlSnippet = IconSizesExampleComponent.htmlSnippet;
  customHtmlSnippet = IconCustomExampleComponent.htmlSnippet;

  iconRegistrationCodeSnippet = IconCustomExampleComponent.codeSnippet;

  provideNewIconUrlCodeSnippet = `// In app providers:
{
  provide: BUILT_IN_ICONS_URL,
  useValue: 'https://example.org/1.0.1/kirby/icons/svg/'
}`;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'name',
      description:
        'Name of the icon that you want to show. If a matching icon is not found, the default is used.',
      defaultValue: 'cog',
      type: defaultIcons,
    },
    {
      name: 'size',
      description: 'Determines the size of the icon.',
      defaultValue: IconSize.SM,
      type: Object.values(IconSize),
    },
    {
      name: 'themeColor',
      description: 'Sets which color the icon should use from the theme palette.',
      defaultValue: 'null',
      type: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'light',
        'medium',
        'dark',
      ],
    },
  ];
}
