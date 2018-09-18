import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {KirbyModule} from '~/kirby/kirby.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CardExampleComponent} from './examples/card-example/card-example.component';
import {CardDesignerComponent} from './design/card-designer/card-designer.component';
import {ButtonExampleComponent} from './examples/button-example/button-example.component';
import {SideNavComponent} from './page/side-nav/side-nav.component';
import {HeaderComponent} from './page/header/header.component';
import {CardShowcaseComponent} from './showcase/card-showcase/card-showcase.component';
import {ComponentTemplateViewerComponent} from './shared/component-template-viewer/component-template-viewer.component';
import {IntroComponent} from './intro/intro.component';
import { ButtonShowcaseComponent } from './showcase/button-showcase/button-showcase.component';
import { HtmlViewerComponent } from './shared/html-viewer/html-viewer.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CardExampleComponent,
        CardDesignerComponent,
        ButtonExampleComponent,
        SideNavComponent,
        HeaderComponent,
        CardShowcaseComponent,
        ComponentTemplateViewerComponent,
        IntroComponent,
        ButtonShowcaseComponent,
        HtmlViewerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        KirbyModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
