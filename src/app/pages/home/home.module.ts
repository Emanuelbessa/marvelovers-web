import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { HomeComponent } from './home.component';
import { routes } from './home.routing';

@NgModule({
  declarations: [HomeComponent, CarouselComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
})
export class HomeModule { }
