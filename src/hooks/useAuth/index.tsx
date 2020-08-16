import React, {createContext, useState, useEffect, useCallback, useContext} from 'react';
import {useApi, useOApi} from '../useApi';
import {IUser, IUpdateUser} from './types';
import {useLoading} from '../useLoading';

interface IAuthContext {
  signed: boolean;
  user: IUser;
  token: string | null;
  login: (user: { email: string; password: string }) => Promise<void>;
  updateUser: (user : IUser) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({children}) => {
  const {api} = useApi();
  const {oapi} = useOApi();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [auth, setAuth] = useState<{ token: string; userId: string } | null>(null);
  const [signed, setSigned] = useState(false);
  const {loading, setLoading} = useLoading(true);

  const getUser = useCallback(async (userId: string) => {
    try {
      const {data} = await api.get(`/users/${userId}`);
      if (data._id) {
        setUser({...data, firstName: data?.name?.split(' ')[0]});
        setSigned(true);
      }
      setLoading(false); 
    } catch (error) {
      setAuth(null);
    }
  }, [api, setLoading]);

  const updateUser = useCallback(async (user: IUpdateUser) => {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('type', user.type);
    formData.append('following', JSON.stringify(user.following));
    if (user.profilePicture) {
      formData.append('profilePicture', user.profilePicture);
    }
    if (user.profile) {
      formData.append('profile', JSON.stringify(user.profile));
    }
    if (user.profilePictureFile) {
      formData.append('profilePictureFile', user.profilePictureFile);
    }
    await api.put('/users', formData);
    getUser(user._id);
  }, [api, getUser]);


  const login = useCallback(async (user: { email: string; password: string }) => {
    const {data} = await oapi.post('/users/signIn', user);
    setAuth(data);
  }, [oapi]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuth(null);
  }, []);

  useEffect(() => {
    const verifyToken = async (token: string, userId: string) => {
      try {
        const {data} = await oapi.post('/users/verifyToken', {token});
        if (data.valid) {
          setAuth({token, userId});
        } else {
          throw new Error('Invalid token');
        } 
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoading(false);
      }
    };
    const localToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (localToken && userId) {
      verifyToken(localToken, userId);
    } else {
      setLoading(false);
    }
  }, [oapi, setLoading]);

  useEffect(() => {
    if (auth) {
      const {token, userId} = auth;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      getUser(userId);
    } else {
      setSigned(false);
    }
  }, [api.defaults.headers, auth, getUser]);

  if (loading) return null;
  
  return <AuthContext.Provider value={{user, signed, login, logout, updateUser, token: auth?.token || null}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return {...ctx, AuthProvider};
};

