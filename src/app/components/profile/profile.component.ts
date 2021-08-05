import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdatePassProfile, UpdateUserDto, UserToken } from '@shared/model/user';
import { AuthService } from 'src/app/pages/auth/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;

  editPasswordForm: FormGroup;

  user: UserToken = this.authService.decodeToken();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required],
    });

    this.editPasswordForm = this.fb.group({
      currentPass: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmed: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.comparePass });

    this.profileService.getUserById(this.user.cod_user_usr).subscribe(
      (user) => {
        this.user = user;
        this.editProfileForm.controls.name.setValue(user.des_name_usr);
        this.editProfileForm.controls.nickname.setValue(user.des_nickname_usr);
      },
      (err) => {
        console.log(err);
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

  submitPasswords(): void {
    if (this.editPasswordForm.valid) {
      Swal.showLoading();
      const pass: UpdatePassProfile = {
        des_old_pass_usr: this.editPasswordForm.get('currentPass').value,
        des_password_usr: this.editPasswordForm.get('password').value,
      };
      this.profileService.patchPass(pass).subscribe(
        () => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: true,
            title: 'Sucesso!',
            text: 'Senha atualizada com sucesso!',
            confirmButtonText: 'Ok',
            icon: 'success',
            showCloseButton: true,
            didClose: () => {
              this.authService.logout();
            },
            timer: 3000,
          });
        },
        (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Erro!', err.error.message, 'error');
        },
      );
    }
  }

  submitEditForm(): void {
    if (this.editProfileForm.valid) {
      Swal.showLoading();
      const user: UpdateUserDto = {
        des_name_usr: this.editProfileForm.get('name').value,
        des_nickname_usr: this.editProfileForm.get('nickname').value,
      };
      this.profileService.putProfile(user).subscribe(
        () => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: true,
            title: 'Sucesso!',
            text: 'Dados atualizados com sucesso!',
            confirmButtonText: 'Ok',
            icon: 'success',
            showCloseButton: true,
            didClose: () => {
              this.authService.logout();
            },
            timer: 3000,
          });
        },
        (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Erro!', err.error.message, 'error');
        },
      );
    }
  }
}
