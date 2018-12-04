import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SpaAngularEditableComponentsModule } from '@adobe/cq-angular-editable-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { TextComponent } from './components/text/text.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    TextComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpaAngularEditableComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ImageComponent, TextComponent]
})
export class AppModule { }
