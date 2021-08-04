import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritedComponent } from './favorited/favorited.component';
import { CharactersComponent } from './list/characters.component';

const routes: Routes = [
  {
    path: 'characters',
    children: [
      {
        path: '',
        component: CharactersComponent,
        data: {
          title: 'Characters',
        },
      },
      {
        path: 'favorites',
        component: FavoritedComponent,
        data: {
          title: 'Characters',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule {}
