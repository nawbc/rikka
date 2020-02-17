import React, { FC, ReactNode, CSSProperties } from 'react';
import { remote } from 'electron';
import './index.css';

const { BrowserWindow } = remote;

interface LinkProp {
  href: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const ElectronLink: FC<LinkProp> = function(props) {
  const { children, href, style } = props;

  return (
    <span
      className="electron-link"
      style={!!style ? style : {}}
      onClick={() => {
        const win = new BrowserWindow({
          width: 800,
          height: 600,
          show: false,
          frame: true,
          webPreferences: {
            nodeIntegration: true,
            webSecurity: false
          }
        });
        win.loadURL(href);
        win.show();
      }}
    >
      {children}
    </span>
  );
};
