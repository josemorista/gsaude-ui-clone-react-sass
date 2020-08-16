import React from 'react';
import './global.scss';
import {Routes} from './routes';
import {useAuth} from '../hooks/useAuth';
import {useMessage} from '../hooks/useMessage';


export const App = () => {
  const {AuthProvider} = useAuth();
  const {MessagesProvider} = useMessage();
  return (
    <AuthProvider>
      <MessagesProvider>
        <Routes />
      </MessagesProvider>
    </AuthProvider>
  );
};

