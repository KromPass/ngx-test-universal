import {BrowserModule} from '@angular/platform-browser';
import {PLATFORM_ID, APP_ID, Inject, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {QuotationComponent} from './landing/quotation/quotation.component';
import { MoreLanguagesComponent } from './landing/quotation/more-languages/more-languages.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    QuotationComponent,
    MoreLanguagesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'test-ng-chips-render'}),
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LandingComponent,
        }
      ],
      {enableTracing: environment.debugRoutes} // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {
  }

}
