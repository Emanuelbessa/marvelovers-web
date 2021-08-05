import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComicsComponent } from './list/comics.component';
import { ComicRoutingModule } from './comics.routing';
import { FavoritedComponent } from './favorited/favorited.component';

@NgModule({
  declarations: [
    ComicsComponent,
    FavoritedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ComicRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class ComicsModule { }
