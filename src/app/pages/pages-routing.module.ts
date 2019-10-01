import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskListComponent } from './task-list/task-list.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'home', component: HomepageComponent, children: [{path:':id', component: TaskListComponent}]},
      {path: '', component: HomepageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
