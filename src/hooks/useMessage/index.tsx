import React, {createContext, useState, useCallback, useContext} from 'react';
import {Toast} from '../../components/templates/Toast';

interface IToastMessage {
  title: string;
  message: string;
  error?: boolean;
}

interface IMessagesContext {
  createMessage: (message : IToastMessage) => void;
}

const MessagesContext = createContext<IMessagesContext>({} as IMessagesContext);


const MessagesProvider : React.FC = ({children}) => {
  const [message, setMessage] = useState<IToastMessage | null>(null);

  const createMessage = useCallback((newMessage: IToastMessage) => {
    setMessage(newMessage);
  }, []);

  return (
    <div>
      { message ? 
        <Toast autoHide message={message.message} error={message.error || false} title={message.title} onClose={() => {
          setMessage(null);
        }} />
        : null}
      <MessagesContext.Provider value={{
        createMessage
      }}>
        {children}
      </MessagesContext.Provider>
    </div>
  );
};


export const useMessage = () => {
  const ctx = useContext(MessagesContext);
  return {...ctx, MessagesProvider};
};