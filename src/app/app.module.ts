import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataService,
    LoggerService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
