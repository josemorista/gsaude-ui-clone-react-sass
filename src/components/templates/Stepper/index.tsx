import React from 'react';
import './stepperStyles.scss';
import {AiFillCheckCircle, AiOutlineCheckCircle} from 'react-icons/ai';

interface IStepperProps {
  steps: Array<string>;
  activeStep: number;
}

export const Stepper : React.FC<IStepperProps> = ({steps, activeStep}) => {
  return (
    <div className="stepper-wrapper">
      {steps.map((step, index) => <div key={index} className={index === activeStep ? 'step-active' : 'step'}>
        <div className="step-icon">{index <= activeStep ? <AiFillCheckCircle /> :  <AiOutlineCheckCircle />}</div>
        <p>{step}</p>
      </div>)}
    </div>
  );
};