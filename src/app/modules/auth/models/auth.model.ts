export class AuthModel {
  token:string;
  expiration:string;
  userId:number;

  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.expiration = auth.expiration;
    this.userId= auth.userId;
  }
}
