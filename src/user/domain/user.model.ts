import { Base } from "../../shared/interfaces/base.model";

export interface UserModel extends Base {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  active:boolean;
}
