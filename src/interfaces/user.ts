export interface Role {
  id: string;
  value: string;
}
export interface IUser {
  id: string;
  fname: string;
  lname: string;
  email: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  role?: Role;
  roleId: string;
}
