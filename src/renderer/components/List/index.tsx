import React, { FC, ReactNode, CSSProperties } from 'react';
import './index.css';
import { HTMLAttributes } from 'enzyme';

interface ListProp {
  children: ReactNode;
}

interface ListItemProp extends HTMLAttributes {
  prefixBlock: ReactNode;
  other?: ReactNode;
  style?: CSSProperties;
}

export const List: FC<ListProp> = function(props) {
  return <ul className="list-wrapper">{props.children}</ul>;
};

export const ListItem: FC<ListItemProp> = function(props) {
  const { prefixBlock, other, ...rest } = props;

  return (
    <li className="list" {...rest}>
      <span>{prefixBlock}</span>
      <div className="list-right">{other}</div>
    </li>
  );
};
