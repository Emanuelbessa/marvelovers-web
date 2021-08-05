import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritedComponent } from './favorited/favorited.component';
import { ComicsComponent } from './list/comics.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ComicsComponent,
        data: {
          title: 'Comics',
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
export class ComicRoutingModule {}
