export enum ACCOUNT_TYPE {
  GOOGLE,
  FACEBOOK,
  TWITTER,
  EMAIL
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  photoUrl?: string;
  password?: string;
  registerBy: ACCOUNT_TYPE
}
