import React from 'react';
import './modalStyles.scss';
import {AiOutlineClose} from 'react-icons/ai';
import {Button} from '../Button';
import {Stepper} from '../Stepper';

interface IModalProps {
  title?:string;
  steps?: {
    steps: Array<string>;
    activeStep: number;
  }
  subtitle?:string;
  onClose: () => void | Promise<void>
}

export const Modal: React.FC<IModalProps> = ({children, title, subtitle, onClose, steps}) => {
  return <div className="modal-container">
    <div className="modal-content">
      <div className="modal-close-icon" onClick={() => {
        onClose();
      }}>
        <Button icon={<AiOutlineClose />} />
      </div>
      <header className="modal-header">
        {title ? <p className="modal-title">{title}</p> : null}
        {subtitle ? <p className="modal-subtitle">{subtitle}</p> : null}
        {steps ? <Stepper steps={steps.steps} activeStep={steps.activeStep} /> : null}
      </header>
      <main className="modal-body">
        {children}
      </main>
    </div>
  </div>;
};