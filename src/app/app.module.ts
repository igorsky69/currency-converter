import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { AboutComponent } from './components/about/about.component';
import { SettingService } from './services/setting.service';
import { ConverterService } from './services/converter.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    SettingService,
    ConverterService,
    { provide: APP_INITIALIZER, useFactory: (setting: SettingService) => function() {return setting.getSetting()}, multi: true, deps: [SettingService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
