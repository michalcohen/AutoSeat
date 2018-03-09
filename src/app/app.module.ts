import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { WelcomeModule } from './welcome/welcome.module';
import { ManagerModule } from './manager/manager.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        WelcomeModule,
        ManagerModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
