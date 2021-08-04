import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './list/characters.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'characters',
        component: CharactersComponent,
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
