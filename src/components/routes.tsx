import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { useAuth } from '../hooks/useAuth';

export const Routes = () => {
  const { signed } = useAuth();
  return <BrowserRouter>
    {signed ? null : <Landing />}
  </BrowserRouter>;
};