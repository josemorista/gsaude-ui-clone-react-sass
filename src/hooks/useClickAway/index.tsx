import React, {useEffect, useCallback} from 'react';

export const useClickAway = <T extends unknown>({ref, onClose} : {ref: React.RefObject<T>, onClose: () => void | Promise<void>}) => {
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (onClose && !(ref.current! as any).contains(e.target)) {
        onClose();
      }
    },
    [onClose, ref],
  );
  
  useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);
};