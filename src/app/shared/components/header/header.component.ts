import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserToken } from '@shared/model/user';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  user: UserToken;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.decodeToken();
  }

  logout(): void {
    this.authService.logout();
  }
}
