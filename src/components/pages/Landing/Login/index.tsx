import React, {useCallback} from 'react';
import {useForm} from '../../../../hooks/useForm';
import {ILoginUser} from './types';
import {Input} from '../../../templates/Input';
import {Button} from '../../../templates/Button';
import {AiOutlineUser, AiOutlineRight, AiOutlineLock} from 'react-icons/ai';
import logo from '../../../../assets/imgs/logo.png';
import './loginStyles.scss';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../../../hooks/useAuth';
import {useMessage} from '../../../../hooks/useMessage';

export const Login = () => {
  const history = useHistory();
  const {login} = useAuth();
  const {createMessage} = useMessage();
  const {values: user, handleChange: handleUserChange} = useForm<ILoginUser>({
    email: '',
    password: ''
  });

  const handleSubmit = useCallback(async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(user);
    } catch (error) {
      createMessage({
        title: 'Ops, algo deu errado!',
        message: 'Verifique seus dados e tente novamente ;)',
      });
    }
  }, [login, user, createMessage]);

  return (
    <div className="container-login">
      <header className='header'>
        <img src={logo} alt='Garante Saúde' onClick={() => {
          history.push('/');
        }} />
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="welcome">Seja bem vindo ;)</p>
        <Input autoComplete type='email' icon={<AiOutlineUser />} name="email" value={user.email} onChange={handleUserChange} placeholder="Digite seu melhor email" label="Email" />
        <Input type='password' icon={<AiOutlineLock />} name="password" value={user.password} onChange={handleUserChange} placeholder="Digite sua melhor senha" label="Senha" />
        <p className="switch-form-text" onClick={() => {
          history.push('/registrar');
        }}>
          Ainda não possui uma conta? Clique aqui e registre-se!
        </p>
        <Button icon={<AiOutlineRight />} type='submit'>Entrar</Button>
      </form>
    </div>
  );
};
