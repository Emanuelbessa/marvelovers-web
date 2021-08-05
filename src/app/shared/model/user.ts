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

export interface UpdateUserDto {
  des_name_usr: string;
  des_nickname_usr: string;
}

export interface UpdatePassProfile {
  des_password_usr: string;
  des_old_pass_usr: string;
}
