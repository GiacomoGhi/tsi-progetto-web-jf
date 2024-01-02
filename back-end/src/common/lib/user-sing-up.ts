import { Role } from '@interfaces';

export interface UserSingUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profession: string; //TODO use an Enum
}
