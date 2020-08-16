
export interface IDependent {
  email: string;
  name: string;
  documents: {
    cpfOrCnpj: string;
  }
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  type: string;
  documents: {
    cpfOrCnpj: string;
  };
  signature?: {
    type?: string,
    payment?: IPayment | null;
    dependents?: Array<IDependent>
  }
}

export interface ISignatureType {
  _id: string;
  label: string;
  currentAmount: {
    byAdditionalDependent: number;
    amount: number;
  };
  numberOfDependents: number;
  usersTypes: Array<string>;
}
