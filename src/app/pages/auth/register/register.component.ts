import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto } from '@shared/model/user';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      des_name_usr: ['', [Validators.required]],
      des_nickname_usr: ['', [Validators.required]],
      des_email_usr: ['', [Validators.required, Validators.email]],
      pass: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          passwordConfirmed: ['', [Validators.required, Validators.minLength(8)]],
        },
        { validator: this.comparePass },
      ),
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const user: CreateUserDto = {
      des_name_usr: this.registerForm.controls.des_name_usr.value,
      des_nickname_usr: this.registerForm.controls.des_nickname_usr.value,
      des_email_usr: this.registerForm.controls.des_email_usr.value,
      des_password_usr: this.registerForm.get('pass.password').value,
    };
    Swal.showLoading();
    this.authService
      .register(user)
      .subscribe(
        () => {
          Swal.close();
          Swal.fire('Success!', 'Usuário criado com sucesso', 'success');
          this.router.navigateByUrl('/auth/login');
        },
        (_err) => {
          console.log(_err);
          Swal.fire('Erro!', 'Algo deu errado ao criar usuário, tente novamente mais tarde', 'error');
        },
      );
  }

  comparePass(fb: FormGroup): void {
    const confirmPass = fb.get('passwordConfirmed');
    if (confirmPass.errors == null || 'mismatch' in confirmPass.errors) {
      if (fb.get('password').value !== confirmPass.value) {
        confirmPass.setErrors({ mismatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    }
  }
}
