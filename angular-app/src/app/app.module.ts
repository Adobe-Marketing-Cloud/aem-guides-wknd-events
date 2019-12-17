import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SpaAngularEditableComponentsModule } from '@adobe/cq-angular-editable-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { TextComponent } from './components/text/text.component';
import { ImageComponent } from './components/image/image.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { OfflineBannerComponent } from './components/offline-banner/offline-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    TextComponent,
    ImageComponent,
    HeaderComponent,
    ListComponent,
    OfflineBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpaAngularEditableComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ImageComponent, ListComponent, TextComponent]
})
export class AppModule { }
