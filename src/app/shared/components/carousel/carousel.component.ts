import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  images = ['../../assets/images/2352155.jpg', '../../assets/images/2979609.jpg', '../../assets/images/2979646.jpg', '../../assets/images/2979650.jpg'];

  constructor() { }
}
