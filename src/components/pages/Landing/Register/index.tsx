import React, {useCallback, useMemo} from 'react';
import {useForm} from '../../../../hooks/useForm';
import {IRegisterUser, IDependent, ISignatureType} from './types';
import {Input, Select} from '../../../templates/Input';
import {Button} from '../../../templates/Button';
import {AiOutlineUser, AiOutlineRight, AiOutlineLock, AiOutlineMail, AiOutlineProfile, AiOutlineSolution, AiOutlineSketch} from 'react-icons/ai';
import logo from '../../../../assets/imgs/logo.png';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../../../hooks/useAuth';
import {useOpenFetch} from '../../../../hooks/useFetch';
import {useOApi} from '../../../../hooks/useApi';

import './registerStyles.scss';
import {useMessage} from '../../../../hooks/useMessage';

const usersTypes = [
  {
    label: 'Sou um paciente',
    value: 'patient'
  },
  {
    label: 'Sou um profissional da saúde',
    value: 'professional-doctor'
  },
  {
    label: 'Sou uma empresa',
    value: 'enterprise-laboratory'
  }
];

export const Register = () => {
  const history = useHistory();
  const {oapi} = useOApi();
  const {createMessage} = useMessage();
  const {login} = useAuth();
  
  const {values: user, handleChange: handleUserChange} = useForm<IRegisterUser>({
    email: '',
    name: '',
    password: '',
    type: '',
    documents: {
      cpfOrCnpj: ''
    },
    signature: {
      payment: null,
      dependents: []
    }
  });
  const {data: signaturesTypes} = useOpenFetch<Array<ISignatureType>>('/signaturesTypes');
  const signaturesTypesOptions = useMemo(() => signaturesTypes?.filter(el => el.usersTypes?.includes(user.type)).map(el => ({label:el.label, value: el._id})) || [], [signaturesTypes, user.type]);
  

  const handleSubmit = useCallback(async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await oapi.post('/users/signUp', user);
      await login({
        email: user.email,
        password: user.password
      });
    } catch (error) {
      createMessage({
        title: 'Ops, algo deu errado',
        message: 'Favor verificar seus dados e tentar novamente ;)'
      });
    }
  }, [createMessage, login, oapi, user]);

  console.log(user);

  return (
    <div className="container-register">
      <header className='header'>
        <img src={logo} alt='Garante Saúde' onClick={() => {
          history.push('/');
        }} />
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
        <p className="welcome">Registre-se e venha fazer parte do futuro da medicina :)</p>
        <Input autoComplete type='email' icon={<AiOutlineMail />} name="email" value={user.email} onChange={handleUserChange} placeholder="Digite seu melhor email" label="Email" />
        <Input icon={<AiOutlineUser />} name="name" value={user.name} onChange={handleUserChange} placeholder="Digite seu nome completo" label="Nome" />
        <Input icon={<AiOutlineProfile />} name="documents.cpfOrCnpj" value={user.documents.cpfOrCnpj} onChange={handleUserChange} placeholder="Ex: 188299000..." label="CPF/CNPJ" />
        <Input type='password' icon={<AiOutlineLock />} name="password" value={user.password} onChange={handleUserChange} placeholder="Digite sua melhor senha" label="Senha" />
        <Select label={'Sou um'} icon={<AiOutlineSolution />} placeholder="Ex: Sou um paciente" options={usersTypes} onChange={handleUserChange} name='type' value={user.type} />
        <Select disabled={!user.type} value={user.signature?.type || ''} icon={<AiOutlineSketch />} placeholder='Desejo assinar o plano...' onChange={handleUserChange} label="Certo, qual plano deseja assinar?" name="signature.type" options={signaturesTypesOptions} />
        <p className="switch-form-text" onClick={() => {
          history.push('/entrar');
        }}>
          Já possui uma conta? Clique aqui para entrar!
        </p>
        <Button icon={<AiOutlineRight />} type='submit'>Entrar</Button>
      </form>
    </div>
  );
};
