import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@shared/components/layout/auth/auth.component';
import { ContentComponent } from '@shared/components/layout/content/content.component';
import { CharactersModule } from './components/characters/characters.module';
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
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<CharactersModule> => import('./components/characters/characters.module').then((m) => m.CharactersModule),
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
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, AuthComponent],
  declarations: [AuthComponent],
})
export class AppRoutingModule { }
