import React from 'react';
import './buttonStyles.scss';

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  active?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: 'primary' | 'secondary';
  icon?: JSX.Element;
}

export const Button: React.FC<IButtonProps> = ({type, disabled = false, active = false, onClick = () => {}, children, color='primary', icon}) => {
  return (<button className={color === 'primary' ? `button-primary${active ? '-active' : ''}` : `button-secondary${active ? '-active' : ''}`} type={type} disabled={disabled} onClick={onClick}>
    {icon ? (
      <div className="button-icon">{icon}</div>
    ) : null}
    {children ? <div className="button-content">
      {children}
    </div> 
      : null}
    
  </button>);
};

export const ButtonGroup : React.FC = ({children}) => {
  return (
    <div>
      <div className="button-group">
        {children}
      </div>
    </div>
  );
};