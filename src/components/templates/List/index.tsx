import React, {memo} from 'react';
import './listStyles.scss';

interface IListItemProps {
  button?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
  avatar?: {
    url: string;
    alt: string;
  };
}


export const ListItem : React.FC<IListItemProps> = memo(({children, icon, button = false, onClick=() => {}, avatar}) => {
  return <li className={!button ? 'listitem-container' :'listitem-container-button'} onClick={onClick}>
    {icon ? (
      <div className="listitem-icon">{icon}</div>
    ) : null}
    {avatar ? <img src={avatar.url} alt={avatar.alt} /> : null}
    {children ? <div className="list-item-content">
      {children}
    </div>
      : null}
  </li>;
});

