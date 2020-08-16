import React, {memo, useState, useEffect, useMemo, useRef} from 'react';
import {IFormEvent} from '../../../hooks/useForm';
import './inputStyles.scss';
import {AiOutlineDown, AiOutlineUp, AiOutlineCheck} from 'react-icons/ai';
import {useClickAway} from '../../../hooks/useClickAway';

interface IInputProps {
  onChange: (e : IFormEvent) => void | Promise<void>;
  label?: string;
  name?: string;
  disabled?: boolean;
}

interface IInputFieldProps extends IInputProps{
  size?: 'fullwidth' | 'medium' | 'small';
  value: string | number;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'password';
  autoComplete?: boolean;
  icon?: JSX.Element;
  endIcon?: JSX.Element;
}

export const Input : React.FC<IInputFieldProps> = memo(({onChange, value, label = '', placeholder= '', name = '', type= 'text', autoComplete= false, icon, endIcon, size = 'fullwidth', disabled = false}) => {
  return (
    <div className={`input-wrapper-${size}`}>
      <p className="input-label">{label}</p>
      <div className="input-field">
        {icon ? <div className="input-icon">
          {icon}
        </div>
          : null}
        <input disabled={disabled} type={type} name={name} className="input" placeholder={placeholder} onChange={onChange} value={value} autoComplete={!autoComplete ? 'off' : 'on'}></input>
        {endIcon ? <div className="input-icon">
          {endIcon}
        </div>
          : null}
      </div>
    </div>
  );
});

interface ICheckboxProps extends IInputProps{
  checked: boolean
}

export const Checkbox : React.FC<ICheckboxProps> = ({checked, disabled = false, onChange = () => {}, label = '', name=''}) => {
  return (
    <div className={'checkbox-wrapper'}>
      <div className={`checkbox-icon${checked ? ' checked' : ''}`}>
        <AiOutlineCheck />
      </div>
      <input disabled={disabled} name={name} className="checkbox" type='checkbox' checked={checked} onChange={(e) => {
        const {name} = e.target;
        onChange({target : {name, value: !checked}});
      }
      }/>
      <p className="checkbox-label">{label}</p>
    </div>
  );
};

interface ISelectProps extends IInputFieldProps {
  options: Array<{
    label: string;
    value: any;
  }>
  onSearchChange?: (currentLabel: string) => void | Promise<void>
}

export const Select : React.FC<ISelectProps> = memo(({onChange, onSearchChange, options, value, label, placeholder, name, icon, size = 'fullwidth', disabled = false}) => {
  const [currentLabel, setCurrentLabel] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  useClickAway<HTMLDivElement>({
    ref: selectRef,
    onClose: () => {
      setOpen(false);
    }
  });
  const [open, setOpen] = useState(false);
  const labelOptions = useMemo(() => options.filter(el => el.label?.toLowerCase().includes(String(currentLabel).toLowerCase())).slice(0, 50) || '', [options, currentLabel]);

  useEffect(() => {
    setCurrentLabel(options.find(option => option.value === value)?.label || '');
  }, [value, options]);

  const handleChange = (e : IFormEvent) => {
    const {value} = e.target;
    setCurrentLabel(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div ref={selectRef} className={`input-wrapper-${size} select-wrapper`} onClick={() => {
      if (!disabled) {
        setOpen(open => !open);
      }
    }}>
      <div className="select-container">
        <Input disabled={disabled} icon={icon} endIcon={!open ? <AiOutlineDown /> : <AiOutlineUp />} name={name} label={label} placeholder={placeholder} value={currentLabel} onChange={handleChange} />
        {open ? <div className="select-box">
          {labelOptions.map((option) => (
            <li key={option.value} className="label-option" onClick={(e) => {
              e.stopPropagation();
              onChange({target: {
                name: name || '',
                value: option.value
              }});
              setCurrentLabel(option.label);
              setOpen(false);
            }}>{option.label}</li>
          ))}
        </div>
          :
          null}
      </div>
    </div>
  );
});