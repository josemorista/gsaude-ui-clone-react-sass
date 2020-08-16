import React, {useMemo} from 'react';
import {serverURL} from '../../consts';
import io from 'socket.io-client';


export const useSocket = (path: string) => {
  const socket =  useMemo(() => io(serverURL, {path, autoConnect: false}), [path]);
  return {socket};
};