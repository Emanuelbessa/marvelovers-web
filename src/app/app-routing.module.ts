import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@shared/components/layout/auth/auth.component';
import { ContentComponent } from '@shared/components/layout/content/content.component';
import { AuthModule } from './pages/auth/auth.module';
import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<HomeModule> => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<AuthModule> => import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, AuthComponent],
  declarations: [AuthComponent],
})
export class AppRoutingModule { }
