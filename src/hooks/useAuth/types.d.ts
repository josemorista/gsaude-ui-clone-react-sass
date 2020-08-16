export interface IUser {
  _id: string;
  name: string;
  email: string;
  firstName: string;
  profilePicture?: string;
  type: 'patient' | 'professional-doctor';
  profile: {
    bio: string;
    birthDate: string;
    job: string;
    livingLocation: string;
    links: Array<{
      type: string;
      link: string;
    }>;
  };
  ratings: {
    asPatient?: number;
    asProfessional?: number;
    asEnterprise?: number;
  };
  following: Array<string>;
  medicalSpecializations?: Array<string>;
}

export interface IUpdateUser extends IUser {
  profilePictureFile?: any;
}
