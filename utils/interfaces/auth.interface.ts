export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
