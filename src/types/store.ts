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

export enum INSTALL_INTENT_ENUM {
  JUST_CURIOUS = 'just_curious',
  FURTHER_EDUCATION = 'further_education',
  SEX_POSITIVE = 'sex_positive',
  BODY_CURIOUS = 'body_curious',
  BETTER_PARTNER = 'better_partner',
  PREPARE_FUTURE = 'prepare_future',
  SAFE_PERSON = 'safe_person',
}

export enum CURIOUS_TOPICS_ENUM {
  PROTECTION = 'protection',
  STI_PREVENTION = 'sti_prevention',
  MALE_BODY = 'male_body',
  FEMALE_BODY = 'female_body',
  ENJOYING_SEX = 'enjoying_sex',
  NEUROSCIENCE = 'neuroscience',
  SEXUAL_ORIENTATION = 'sexual_orientation',
}
