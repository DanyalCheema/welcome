import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { UserComponent } from './header/user.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [];

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
  ]
})
export class HomeModule { }
