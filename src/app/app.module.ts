import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule,Location } from '@angular/common'; // Import CommonModule

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@awesome-cordova-plugins/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { provideHttpClient } from '@angular/common/http'
// import { ExchangeRatesComponent } from './exchange-rate/exchange-rate.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,}],
  bootstrap: [AppComponent],
})
export class AppModule {}
