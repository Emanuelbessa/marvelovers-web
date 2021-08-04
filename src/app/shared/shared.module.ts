import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/layout/content/content.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    FeatherIconsComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, NgbCarouselModule],
  exports: [NgbCarouselModule, FeatherIconsComponent],
})
export class SharedModule {}
