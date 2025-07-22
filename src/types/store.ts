export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

export enum GENDER_ENUM {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
