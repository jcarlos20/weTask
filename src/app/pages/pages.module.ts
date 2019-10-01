import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

//Components
import { PagesComponent } from './pages.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskListComponent } from './task-list/task-list.component';
import { GraficasComponent } from '../helpers/graficas/graficas.component';

@NgModule({
  declarations: [
    PagesComponent, 
    HomepageComponent, 
    TaskListComponent, 
    GraficasComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
