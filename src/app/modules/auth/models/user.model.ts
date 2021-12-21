import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email:string;
  isActive:boolean;
  emailConfirmed:boolean;
  phoneNumber:string;
  imageUrl:string;
}
