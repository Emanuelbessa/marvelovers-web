export interface UserToken {
  cod_user_usr: string;
  des_name_usr: string;
  des_nickname_usr: string;
  des_email_usr: string;
  access_token: string;
}

export interface CreateUserDto {
  des_name_usr: string;
  des_nickname_usr: string;
  des_email_usr: string;
  des_password_usr: string;
}
