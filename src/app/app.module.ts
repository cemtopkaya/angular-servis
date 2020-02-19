import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { KisilerModule } from "./kisiler/kisiler.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    KisilerModule
  ],
  providers:[
    LoggerService,
    {provide: 'mandatoryParamIcinTakmaAd', useValue: 'zorunlu param değeri'}, 
    {provide: 'optionalParamIcinTakmaAd', useValue: 'secimli param değeri'}, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
