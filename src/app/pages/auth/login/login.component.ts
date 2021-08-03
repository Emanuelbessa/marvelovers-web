import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserToken } from '@shared/model/user';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  user: UserToken;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(
        () => {
        },
        (_err) => {
          console.log(_err);
          Swal.fire('Erro!', 'Usuário ou senha inválidos!', 'error');
        },
      );
  }
}
