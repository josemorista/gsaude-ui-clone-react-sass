import {useState} from 'react';

export interface IFormEvent {
  target: {
    name: string;
    value: any;
  }
}

const updateNestedField = (values: any, path: string, value: any) : any => {
  const parts = path.split('.');
  const [key, nestedKey] = parts;
  if (!nestedKey) {
    if (values) {
      return {...(values), [key]:value};
    } else {
      return {[key]: value};
    }
  } else {
    return {...values, [key]: updateNestedField(values[key], parts.slice(1).join('.'), value)};
  }
};

export const useFormField = <T extends string | boolean | number>(initialValue : T) => {
  const [value, setValue] = useState<T>(initialValue);
  const handleChange = (e : IFormEvent) => {
    const {value} = e.target;
    setValue(value);
  };
  return {value, handleChange, setValue};
};

export const useForm = <T extends {[key: string]: any}>(initialValue: T) => {
  const [values, setValues] = useState<T>(initialValue);

  const handleChange = (e : IFormEvent) => {
    const {name, value} = e.target;
    if (!name.includes('.')) {
      setValues(values => ({...values, [name]: value}));
    } else {
      setValues(values => updateNestedField(values, name, value));
    }
  };

  return {values, handleChange, setValues};

};