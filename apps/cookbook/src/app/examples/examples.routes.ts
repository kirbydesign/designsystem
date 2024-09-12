import { ModalEnabledRoutes } from '@kirbydesign/designsystem';
import { CanDismissModalGuard } from '@kirbydesign/designsystem/modal';

import { AccordionExampleComponent } from './accordion-example/accordion-example.component';
import { ActionSheetExampleComponent } from './action-sheet-example/action-sheet-example.component';
import { AlertExampleComponent } from './alert-example/alert-example.component';
import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { BadgeExampleComponent } from './badge-example/badge-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CalendarCardExampleComponent } from './calendar-example/calendar-card-example.component';
import { CalendarExampleComponent } from './calendar-example/calendar-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { ChartsExampleComponent } from './charts-example/charts-example.component';
import { CheckboxExampleComponent } from './checkbox-example/checkbox-example.component';
import { EmptyStateExampleComponent } from './empty-state-example/empty-state-example.component';
import { ExamplesComponent } from './examples.component';
import { FabSheetExampleComponent } from './fab-sheet-example/fab-sheet-example.component';
import { FlagExampleComponent } from './flag-example/flag-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { FormFieldInputDateExampleComponent } from './form-field-example/examples/input/date';
import { FormFieldInputDateNativeExampleComponent } from './form-field-example/examples/input/date-native';
import { FormFieldInputDecimalMaskExampleComponent } from './form-field-example/examples/input/decimal-mask';
import { FormFieldExampleComponent } from './form-field-example/form-field-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { GridLayoutExtendedExampleComponent } from './grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component';
import { GridLayoutMultipleContainersExampleComponent } from './grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component';
import { GridLayoutSingleContainerExampleComponent } from './grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ItemExampleComponent } from './item-example/item-example.component';
import { ItemGroupExampleComponent } from './item-group-example/item-group-example.component';
import { ItemSlidingExampleComponent } from './item-sliding-example/item-sliding-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { ListColoredItemsExampleComponent } from './list-example/examples/colored-items';
import { ListItemsExampleComponent } from './list-example/examples/items';
import { ListWithHeaderAndFooterExampleComponent } from './list-example/examples/header-and-footer';
import { ListItemsNoDividersExampleComponent } from './list-example/examples/items-no-dividers';
import { ListWithSectionsExampleComponent } from './list-example/examples/sections';
import { ListWithSectionsAndColoredItemsExampleComponent } from './list-example/examples/sections-and-colored-items';
import { ListWithSectionsAndStandAloneExampleComponent } from './list-example/examples/sections-with-standalone';
import { ListSelectableItemsExampleComponent } from './list-example/examples/selectable-items';
import { ListWithStandAloneExampleComponent } from './list-example/examples/stand-alone';
import { ListExampleComponent } from './list-example/list-example.component';
import { ListExperimentalExampleComponent } from './list-experimental-example/list-experimental-example.component';
import { ListLoadOnDemandExampleComponent } from './list-load-on-demand-example/list-load-on-demand-example.component';
import { ListNoShapeExampleComponent } from './list-no-shape-example/list-no-shape-example.component';
import { ListSwipeExampleComponent } from './list-swipe-example/list-swipe-example.component';
import { LoadingOverlayExampleComponent } from './loading-overlay-example/loading-overlay-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalRoutePage1ExampleComponent } from './modal-example/modal-route-example/modal-route-page1-example.component';
import { ModalRoutePage2ExampleComponent } from './modal-example/modal-route-example/modal-route-page2-example.component';
import { PageAdvancedExampleComponent } from './page-example/advanced/page-advanced-example.component';
import { PageCustomTitleExampleComponent } from './page-example/advanced/page-custom-title-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from './page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFitHeadingExampleComponent } from './page-example/fit-heading/fit-heading-example.component';
import { PageFixedFooterTabsExampleComponent } from './page-example/fixed-footer-tabs/fixed-footer-tabs-example.component';
import { PageFixedFooterTabExampleComponent } from './page-example/fixed-footer-tabs/tab/fixed-footer-tab-example.component';
import { PageFixedTitleAndActionsExampleComponent } from './page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
import { PageContentWidthExampleComponent } from './page-example/content-width/page-content-width-example.component';
import { PageSimpleExampleComponent } from './page-example/simple/page-simple-example.component';
import { PageTabNavExampleComponent } from './page-example/tab-navigation/page-tab-nav-example.component';
import { ProgressCircleExampleComponent } from './progress-circle-example/progress-circle-example.component';
import { RadioExampleComponent } from './radio-example/radio-example.component';
import { RangeExampleComponent } from './range-example/range-example.component';
import { ReorderListExampleComponent } from './reorder-list-example/reorder-list-example.component';
import { SectionHeaderExampleComponent } from './section-header-example/section-header-example.component';
import { SegmentedControlExampleComponent } from './segmented-control-example/segmented-control-example.component';
import { SlideButtonExampleComponent } from './slide-button-example/slide-button-example.component';
import { SlidesSimpleExampleComponent } from './slides-example/slides-simple-example/slides-simple-example.component';
import { SlidesAdvancedExampleComponent } from './slides-example/slides-advanced-example/slides-advanced-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StylingHtmlListsExampleComponent } from './styling-html-lists-example/styling-html-lists-example.component';
import { TabExampleComponent } from './tabs-example/tab/tab-example.component';
import { TabExampleMenuComponent } from './tabs-example/tab/tab-example-menu.component';
import { TabsExampleComponent } from './tabs-example/tabs-example.component';
import { ToastExampleComponent } from './toast-example/toast-example.component';
import { ToggleButtonExampleComponent } from './toggle-button-example/toggle-button-example.component';
import { ToggleExampleComponent } from './toggle-example/toggle-example.component';
import { VirtualScrollListExampleComponent } from './virtual-scroll-example/virtual-scroll-list-example/virtual-scroll-list-example.component';
import { PagePullToRefreshExampleComponent } from './page-example/pull-to-refresh/page-pull-to-refresh-example.component';
import { DropdownExampleComponent } from './dropdown-example/dropdown-example.component';
import { DataTableExampleComponent } from './data-table-example/data-table-example.component';
import { HeaderExampleComponent } from './header-example/header-example.component';
import { HeaderWithActionGroupExampleComponent } from './header-example/examples/action-group';
import { HeaderWithEmphasizedActionGroupExampleComponent } from './header-example/examples/emphasize-actions';
import { HeaderWithCustomActionsExampleComponent } from './header-example/examples/custom-actions';
import { HeaderWithInteractiveTitleExampleComponent } from './header-example/examples/interactive-title';
import { MenuExampleComponent } from './menu-example/menu-example.component';
import { ModalExampleSimpleComponent } from './modal-example/modal-example-simple.component';
import { ModalExampleAdvancedComponent } from './modal-example/modal-example-advanced.component';
import { ModalExampleOutletComponent } from './modal-example/modal-example-outlet.component';
import { ModalExampleAlertComponent } from './modal-example/modal-example-alert.component';
import { ModalExampleAlertWithGuardComponent } from './modal-example/modal-example-alert-with-guard.component';
import { ModalEmbeddedAlertExampleComponent } from './modal-example/alert-example/modal-example-embedded-alert.component';
import { ModalComponentExampleComponent } from './modal-example/modal-component-example.component';
import { SlidesHeightExampleComponent } from './slides-example/slides-height-example/slides-height-example.component';

export const routes: ModalEnabledRoutes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: 'page',
        children: [
          {
            path: '',
            redirectTo: 'simple',
            pathMatch: 'full',
          },
          {
            path: 'simple',
            component: PageSimpleExampleComponent,
          },
          {
            path: 'alignment-toolbar-title',
            component: PageAlignmentAndToolbarTitleExampleComponent,
          },
          {
            path: 'fit-heading',
            component: PageFitHeadingExampleComponent,
          },
          {
            path: 'fixed',
            component: PageFixedTitleAndActionsExampleComponent,
          },
          {
            path: 'fixed-footer',
            component: PageFixedFooterTabsExampleComponent,
            children: [
              {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full',
              },
              {
                path: 'overview',
                component: PageFixedFooterTabExampleComponent,
                data: {
                  title: 'Overview',
                },
              },
              {
                path: 'transfer',
                children: [
                  {
                    path: '',
                    component: TabExampleComponent,
                    data: {
                      title: 'Transfer',
                    },
                  },
                  {
                    path: 'sub',
                    component: TabExampleComponent,
                    data: {
                      title: 'Transfer Sub',
                    },
                  },
                ],
              },
              {
                path: 'inbox',
                component: TabExampleComponent,
                data: {
                  title: 'Inbox',
                },
              },
              {
                path: 'menu',
                component: TabExampleMenuComponent,
              },
            ],
          },
          {
            path: 'custom-title',
            component: PageCustomTitleExampleComponent,
          },
          {
            path: 'advanced',
            component: PageAdvancedExampleComponent,
          },
          {
            path: 'tab-navigation',
            component: PageTabNavExampleComponent,
          },
          {
            path: 'pull-to-refresh',
            component: PagePullToRefreshExampleComponent,
          },
          {
            path: 'content-width',
            component: PageContentWidthExampleComponent,
          },
          {
            path: 'header-and-action-group',
            component: HeaderWithActionGroupExampleComponent,
          },
          {
            path: 'header-and-emphasized-action-group',
            component: HeaderWithEmphasizedActionGroupExampleComponent,
          },
          {
            path: 'header-and-custom-actions',
            component: HeaderWithCustomActionsExampleComponent,
          },
          {
            path: 'header-and-interactive-title',
            component: HeaderWithInteractiveTitleExampleComponent,
          },
        ],
      },
      {
        path: 'tabs',
        component: TabsExampleComponent,
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            component: TabExampleComponent,
            data: {
              title: 'Overview',
            },
          },
          {
            path: 'transfer',
            children: [
              {
                path: '',
                component: TabExampleComponent,
                data: {
                  title: 'Transfer',
                },
              },
              {
                path: 'sub',
                component: TabExampleComponent,
                data: {
                  title: 'Transfer Sub',
                },
              },
            ],
          },
          {
            path: 'inbox',
            component: TabExampleComponent,
            data: {
              title: 'Inbox',
            },
          },
          {
            path: 'menu',
            component: TabExampleMenuComponent,
          },
        ],
      },
      {
        path: 'reorder-list',
        component: ReorderListExampleComponent,
      },
      {
        path: 'modal',
        component: ModalExampleComponent,
      },
      {
        path: 'modal-advanced',
        component: ModalExampleAdvancedComponent,
      },
      {
        path: 'modal-simple',
        component: ModalExampleSimpleComponent,
      },
      {
        path: 'modal-component',
        component: ModalComponentExampleComponent,
      },
      {
        path: 'modal-alert',
        component: ModalExampleAlertComponent,
      },
      {
        path: 'modal-with-guard',
        component: ModalExampleAlertWithGuardComponent,
        data: {
          step: 2,
          nextRoute: '../modal-with-guard-open',
        },
      },
      {
        path: 'modal-with-guard-open',
        component: ModalExampleAlertWithGuardComponent,
        canDeactivate: [CanDismissModalGuard],
        data: {
          step: 3,
        },
      },
      {
        path: 'modal-route-with-guard',
        component: ModalExampleAlertWithGuardComponent,
        data: {
          step: 2,
          nextRoute: ['./', { outlets: { modal: ['page1'] } }],
        },
        children: [
          {
            path: 'page1',
            outlet: 'modal',
            component: ModalEmbeddedAlertExampleComponent,
            canDeactivate: [CanDismissModalGuard],
          },
        ],
      },
      {
        path: 'modal-route',
        component: ModalExampleOutletComponent,
        children: [
          {
            path: 'page1',
            outlet: 'modal',
            component: ModalRoutePage1ExampleComponent,
            data: {
              modalConfig: {
                size: 'large',
                flavor: 'drawer',
              },
            },
          },
          {
            path: 'page2',
            outlet: 'modal',
            component: ModalRoutePage2ExampleComponent,
          },
        ],
      },
      {
        path: 'modal-route-with-url-param/:id',
        component: ModalExampleOutletComponent,
        children: [
          {
            path: 'page1',
            outlet: 'modal',
            component: ModalRoutePage1ExampleComponent,
          },
          {
            path: 'page2',
            outlet: 'modal',
            component: ModalRoutePage2ExampleComponent,
          },
        ],
      },
      {
        path: 'form-field',
        children: [
          {
            path: '',
            component: FormFieldExampleComponent,
          },
          {
            path: 'date',
            component: FormFieldInputDateExampleComponent,
          },
          {
            path: 'date-native',
            component: FormFieldInputDateNativeExampleComponent,
          },
          {
            path: 'decimal-mask',
            component: FormFieldInputDecimalMaskExampleComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'item',
    component: ItemExampleComponent,
  },
  {
    path: 'item-sliding',
    component: ItemSlidingExampleComponent,
  },
  {
    path: 'item-group',
    component: ItemGroupExampleComponent,
  },
  {
    path: 'section-header',
    component: SectionHeaderExampleComponent,
  },
  {
    path: 'button',
    component: ButtonExampleComponent,
  },
  {
    path: 'slide-button',
    component: SlideButtonExampleComponent,
  },
  {
    path: 'card',
    component: CardExampleComponent,
  },
  {
    path: 'list',
    component: ListExampleComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'with-items',
      },
      {
        path: 'with-items',
        component: ListItemsExampleComponent,
      },
      {
        path: 'with-selectable-items',
        component: ListSelectableItemsExampleComponent,
      },
      {
        path: 'with-colored-items',
        component: ListColoredItemsExampleComponent,
      },
      {
        path: 'with-sections-and-colored-items',
        component: ListWithSectionsAndColoredItemsExampleComponent,
      },
      {
        path: 'with-header-and-footer',
        component: ListWithHeaderAndFooterExampleComponent,
      },
      {
        path: 'with-sections',
        component: ListWithSectionsExampleComponent,
      },
      {
        path: 'with-items-no-dividers',
        component: ListItemsNoDividersExampleComponent,
      },
      {
        path: 'with-stand-alone',
        component: ListWithStandAloneExampleComponent,
      },
      {
        path: 'with-sections-and-stand-alone',
        component: ListWithSectionsAndStandAloneExampleComponent,
      },
    ],
  },
  {
    path: 'list-swipe',
    component: ListSwipeExampleComponent,
  },
  {
    path: 'list-no-shape',
    component: ListNoShapeExampleComponent,
  },
  {
    path: 'list-load-on-demand',
    component: ListLoadOnDemandExampleComponent,
  },
  {
    path: 'list-experimental',
    component: ListExperimentalExampleComponent,
  },
  {
    path: 'chart',
    component: ChartsExampleComponent,
  },
  {
    path: 'grid',
    component: GridExampleComponent,
  },
  {
    path: 'grid-layout-single-container',
    component: GridLayoutSingleContainerExampleComponent,
  },
  {
    path: 'grid-layout-multiple-containers',
    component: GridLayoutMultipleContainersExampleComponent,
  },
  {
    path: 'grid-layout-extended',
    component: GridLayoutExtendedExampleComponent,
  },
  {
    path: 'virtual-scroll-list',
    component: VirtualScrollListExampleComponent,
  },
  {
    path: 'avatar',
    component: AvatarExampleComponent,
  },
  {
    path: 'fonts',
    component: FontsExampleComponent,
  },
  {
    path: 'spinner',
    component: SpinnerExampleComponent,
  },
  {
    path: 'loading-overlay',
    component: LoadingOverlayExampleComponent,
  },
  {
    path: 'action-sheet',
    component: ActionSheetExampleComponent,
  },
  {
    path: 'alert',
    component: AlertExampleComponent,
  },
  {
    path: 'segmented-control',
    component: SegmentedControlExampleComponent,
  },
  {
    path: 'badge',
    component: BadgeExampleComponent,
  },
  {
    path: 'flag',
    component: FlagExampleComponent,
  },
  {
    path: 'icon',
    component: IconExampleComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxExampleComponent,
  },
  {
    path: 'toast',
    component: ToastExampleComponent,
  },
  {
    path: 'toggle',
    component: ToggleExampleComponent,
  },
  {
    path: 'calendar',
    component: CalendarExampleComponent,
  },
  {
    path: 'calendar-card',
    component: CalendarCardExampleComponent,
  },
  {
    path: 'empty-state',
    component: EmptyStateExampleComponent,
  },
  {
    path: 'fab-sheet',
    component: FabSheetExampleComponent,
  },
  {
    path: 'dropdown',
    component: DropdownExampleComponent,
  },
  {
    path: 'progress-circle',
    component: ProgressCircleExampleComponent,
  },
  {
    path: 'toggle-button',
    component: ToggleButtonExampleComponent,
  },
  {
    path: 'slides',
    component: SlidesSimpleExampleComponent,
  },
  {
    path: 'slides-height',
    component: SlidesHeightExampleComponent,
  },
  {
    path: 'slides-advanced',
    component: SlidesAdvancedExampleComponent,
  },
  {
    path: 'accordion',
    component: AccordionExampleComponent,
  },
  {
    path: 'radio',
    component: RadioExampleComponent,
  },
  {
    path: 'range',
    component: RangeExampleComponent,
  },
  {
    path: 'link',
    component: LinkExampleComponent,
  },
  {
    path: 'styling-HTML-lists',
    component: StylingHtmlListsExampleComponent,
  },
  {
    path: 'data-table',
    component: DataTableExampleComponent,
  },
  {
    path: 'menu',
    component: MenuExampleComponent,
  },
  {
    path: 'header',
    component: HeaderExampleComponent,
  },
  {
    path: 'menu',
    component: MenuExampleComponent,
  },
];
