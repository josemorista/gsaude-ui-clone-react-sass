import React from 'react';
import './cardStyles.scss';

interface ICardProps {
  title?: string;
  subtitle?: string;
}

export const Card : React.FC<ICardProps> = ({title, subtitle, children}) => {
  return <section className="container-card">
    {title ? <p className="card-title">{title}</p> : null}
    {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
    <div className="card-content">
      {children}
    </div>
  </section>;
};