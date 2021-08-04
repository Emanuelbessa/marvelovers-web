import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '@shared/shared.module';
import { CharactersComponent } from './list/characters.component';
import { CharacterRoutingModule } from './characters.routing';

@NgModule({
  declarations: [
    CharactersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CharacterRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class CharactersModule { }
