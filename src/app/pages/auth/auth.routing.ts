import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from './register/register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login',
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register',
        },
      },
    ],
  },
];
