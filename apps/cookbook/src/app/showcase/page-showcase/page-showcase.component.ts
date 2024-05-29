import { Component } from '@angular/core';
import { PageAdvancedExampleComponent } from '~/app/examples/page-example/advanced/page-advanced-example.component';
import { PageCustomTitleExampleComponent } from '~/app/examples/page-example/advanced/page-custom-title-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from '~/app/examples/page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFitHeadingExampleComponent } from '~/app/examples/page-example/fit-heading/fit-heading-example.component';
import { PageFixedFooterTabExampleComponent } from '~/app/examples/page-example/fixed-footer-tabs/tab/fixed-footer-tab-example.component';
import { PageFixedTitleAndActionsExampleComponent } from '~/app/examples/page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
import { PagePullToRefreshExampleComponent } from '~/app/examples/page-example/pull-to-refresh/page-pull-to-refresh-example.component';
import { PageContentWidthExampleComponent } from '~/app/examples/page-example/content-width/page-content-width-example.component';
import { PageSimpleExampleComponent } from '~/app/examples/page-example/simple/page-simple-example.component';
import { PageTabNavExampleComponent } from '~/app/examples/page-example/tab-navigation/page-tab-nav-example.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-page-showcase',
  templateUrl: './page-showcase.component.html',
  styleUrls: ['./page-showcase.component.scss'],
})
export class PageShowcaseComponent {
  simpleExampleHtml: string = PageSimpleExampleComponent.template;
  alignmentAndToolbarTitleExampleHtml: string =
    PageAlignmentAndToolbarTitleExampleComponent.template;
  fitHeadingExampleHtml: string = PageFitHeadingExampleComponent.template;
  fixedTitleAndActionsExampleHtml: string = PageFixedTitleAndActionsExampleComponent.template;
  fixedFooterTabsExampleHtml: string = PageFixedFooterTabExampleComponent.template;
  fixedCustomTitleExampleHtml: string =
    PageFixedTitleAndActionsExampleComponent.customTitleTemplate;
  fixedActionsExampleHtml: string = PageFixedTitleAndActionsExampleComponent.fixedActionsTemplate;
  customTitleExampleHtml: string = PageCustomTitleExampleComponent.template;
  advancedExampleHtml: string = PageAdvancedExampleComponent.template;
  tabNavigationHtml = PageTabNavExampleComponent.template;
  tabNavigationTs = PageTabNavExampleComponent.codeSnippet;
  pullToRefreshExampleHtml: string = PagePullToRefreshExampleComponent.template;
  pullToRefreshExampleTs: string = PagePullToRefreshExampleComponent.handler;
  contentWidthExampleHtml: string = PageContentWidthExampleComponent.template;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description:
        'The title of the page. Will stick in the toolbar - including action buttons, if any - when the page is scrolled past the title.',
      type: ['string'],
    },
    {
      name: 'subtitle',
      description: 'The subtitle of the page - requires the presence of a page title.',
      type: ['string'],
    },
    {
      name: 'toolbarTitle',
      description:
        'An alternative text for the title in the toolbar. If `toolbarTitle` is specified instead of `title`, the page title and actions will only be shown in the toolbar and not on the page itself.',
      type: ['string'],
    },
    {
      name: 'titleAlignment',
      description: 'Horizontal alignment of the page title and subtitle within the content pane.',
      defaultValue: 'left',
      type: ['left', 'center', 'right'],
    },
    {
      name: 'defaultBackHref',
      description:
        'Back navigation only shows if any navigation has been done. To make it show even after page-reload provide the page with a `defaultBackHref` e.g. "/".',
      type: ['string'],
    },
    {
      name: 'hideBackButton',
      description: 'Hides the back button in the toolbar.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'tabBarBottomHidden',
      description: 'Hides the tab bar when placed in the bottom.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'maxWidth',
      description: 'Sets the max width for the content',
      defaultValue: 'default',
      type: ['default', 'lg', 'xl', 'full'],
    },
  ];
  events: ApiDescriptionEvent[] = [
    {
      name: 'enter',
      description: 'Emitted when the page has animated into view',
      signature: 'func',
    },
    {
      name: 'leave',
      description: 'Emitted when leaving the page',
      signature: 'func',
    },
    {
      name: 'backButtonClick',
      description:
        'Emitted when the back-button is clicked. When bound, the default back-button click behaviour is disabled.',
      signature: 'func',
    },
  ];

  layoutColumns: ApiDescriptionPropertyColumns = {
    name: 'Tag',
    description: 'Description',
  };

  layouts: ApiDescriptionProperty[] = [
    {
      name: '<kirby-page>',
      description:
        'The `<kirby-page>` is a layout container for a Kirby page. There should only be one `<kirby-page>` layout container per page.',
    },
    {
      name: '<kirby-page-content>',
      description:
        'The `<kirby-page-content>` layout can be used as a convenient wrapper for page content. For more advanced scenarios or when used with `<ng-container>` the `*kirbyPageContent` directive can be applied instead.',
    },
    {
      name: '<kirby-page-actions *kirbyPageActions>',
      description:
        'The `<kirby-page-actions *kirbyPageActions>` layout can be used as a convenient wrapper for page actions. The actions inside are declared through regular Kirby buttons: `<button kirby-button>`. Always apply the `*kirbyPageActions` directive to the action buttons host element to ensure the actions are shown in the toolbar. The `*kirbyPageActions` directive can also be used for more advanced action scenarios or when used with `<ng-container>`.',
    },
  ];

  directiveColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
    type: '(Optional) Configuration',
    default: 'Default',
  };

  directives: ApiDescriptionProperty[] = [
    {
      name: '*kirbyPageTitle',
      description:
        'The `*kirbyPageTitle` directive can be applied to any host or container element which will then be shown at the top of the page. For fixed titles use the `*kirbyPageToolbarTitle` directive instead.',
    },
    {
      name: '*kirbyPageSubtitle',
      description:
        'The `*kirbyPageSubtitle` directive can be applied to any host or container element which will then be shown just below the page title at the top of the page.',
    },
    {
      name: '*kirbyPageToolbarTitle',
      description:
        'The `*kirbyPageToolbarTitle` directive can be applied to any host or container element as an alternative toolbar title to be shown instead of the page title. The element will be shown in the toolbar when the page is scrolled past the title. If no page title is specified the toolbar title will be fixed.',
    },
    {
      name: '*kirbyPageActions',
      description:
        'The `*kirbyPageActions` directive can be applied to any host or container element which will then be shown at the top of the page. The default configuration `{sticky: true}` makes the host element stick in the toolbar when the page is scrolled below the title. To avoid this it can be configured with `{sticky: false}` instead. When configured with `{fixed: true}` the element will be fixed and only shown in the toolbar.',
      type: ['{sticky: boolean}', '{fixed: boolean}'],
      defaultValue: '{sticky: true}',
    },
    {
      name: '*kirbyPageStickyContent',
      description:
        'The `kirbyPageStickyContent` directive can be applied to any host or container element which will then be rendered just above the content of the page. The host element will stick below the toolbar when the page is scrolled beyond that point.',
    },
    {
      name: '*kirbyPageContent',
      description:
        'The `kirbyPageContent` directive can be applied to any host or container element which will then be rendered as the content of the page. When configured with `{fixed: true}` the element will be fixed when scrolling the page. An example use case for this could be a Floating Action Button.',
      type: ['{fixed: boolean}'],
    },
  ];

  cssColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
  };

  cssProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-page-title-margin-bottom',
      description: 'Spacing from the title and subtitle to the page content.`',
      defaultValue: `size('xl')`,
      type: ['unit'],
    },
  ];

  public injectionTokenExample = `import { PAGE_BACK_BUTTON_OVERRIDE, PageBackButtonOverride } from '@kirbydesign/designsystem/page';
  
@Injectable({
  providedIn: 'root',
})
export class MyBackButtonOverrideService implements PageBackButtonOverride {
  constructor(private someDependency: SomeDependency) {}

  navigateBack(routerOutlet: IonRouterOutlet, navCtrl: NavController, defaultBackHref: string) {
    if (routerOutlet?.canGoBack()) {
      // custom use of some dependency could go here:
      this.someDependency.doSomething();

      // and we might still want to use the provided router outlet for something:
      routerOutlet.pop();
    } else {
      // custom use of some dependency could also go here:
      this.someDependency.doSomethingElse();

      // and we might still want to use the provided nav controller for something:
      navCtrl.navigateBack(defaultBackHref);
    }
  }
}

// then provided like this in the providers array (e.g. in app.module.ts)
{ provide: PAGE_BACK_BUTTON_OVERRIDE, useClass: MyBackButtonOverrideService },
`;

  public pageHtml = `<kirby-page\n (enter)="startSubscription()"\n (leave)="stopSubscription()"\n></kirby-page>`;
  public pageComponent = `@Component({
 selector: 'app-a-page',
 templateUrl: './a-page.component.html'
})
export class APageComponent implements OnInit, OnDestroy {
 private $destroy = new Subject<void>();
 private aService: AService;

 constructor(private aService: AService){}

 public ngOnInit(): void {
   this.subscribe();
 }
  
 public ngOnDestroy(): void {
   this.unsubscribe();
 }

 public startSubscription = () => this.subscribe();
 public stopSubscription = () => this.unsubscribe();
   
 private subscribe = () => this.aService.get().pipe(takeUntil(this.$destroy));
   
 private unsubscribe = () => {
   this.$destroy.next();
   this.$destroy.complete;
 }
}
    `;
  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
