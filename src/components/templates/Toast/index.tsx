import React, {useEffect, useRef} from 'react';
import './toastStyles.scss';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
import {useClickAway} from '../../../hooks/useClickAway';

interface IToastProps {
  title: string;
  error?: boolean;
  message?: string;
  autoHide?: boolean;
  duration?: number;
  onClose: () => void | Promise<void>
}

export const Toast : React.FC<IToastProps> = ({message, error = false, title, onClose, autoHide = true, duration = 5000}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  useClickAway<HTMLDivElement>({ref: toastRef, onClose});
  useEffect(() => {
    if (autoHide) {
      const close = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => {
        clearTimeout(close);
      };
    }
  }, [autoHide, duration, onClose]);

  return (
    <div ref={toastRef} className="toast-container">
      <header className={`toast-header${error ? ' error' : ''}`}>
        <div className="toast-icon">
          <AiOutlineExclamationCircle />
        </div>
        <p>{title}</p>
      </header>
      <main className="toast-body">
        {message}
      </main>
    </div>
  );
};