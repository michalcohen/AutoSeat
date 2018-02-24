import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ManagerComponent } from './manager/manager.component';
import { WelcomeComponent } from './welcome/welcome.component'

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'manager',
    component: ManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }