import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicRoutingModule {}
