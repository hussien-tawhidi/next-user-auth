export interface IUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface InputErros {
  [key: string]: string;
}

export interface loginUserParams {
  email: string;
  password: string;
}
