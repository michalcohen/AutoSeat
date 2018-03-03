import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ManagerComponent } from './manager/manager.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { TablesViewComponent } from './manager/tables-view/tables-view.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'manager',
    component: ManagerComponent
  },
  {
    path: 'manager/tables-view',
    component: TablesViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }