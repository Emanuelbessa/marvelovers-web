import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class AuthModule { }
