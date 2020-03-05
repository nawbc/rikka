//@ts-nocheck
import React, { FC, useRef, HTMLAttributes } from 'react';
import { RIcon, ClickDown } from '@/components';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';
import companyWorks from '../../assets/company-works.json';

interface CompanyMarqueeProps extends HTMLAttributes<any> {}

const CompanyMarquee: FC<CompanyMarqueeProps> = function(props) {
  const marqueeRef = useRef(null);

  return (
    <marquee
      {...props}
      ref={marqueeRef}
      behavior="alternate"
      onMouseEnter={() => {
        marqueeRef.current.stop();
      }}
      onMouseLeave={() => {
        marqueeRef.current.start();
      }}
    >
      {Object.entries(companyWorks).map((arr, i) => {
        const obj = arr[1];
        const index = arr[0];

        return (
          <ClickDown key={i}>
            <Tooltip title={obj.name}>
              <NavLink to={`/companyresult/${index}`}>
                <RIcon
                  src={require(`../../assets/image/company/${obj.iconPath}`)}
                  size={obj.iconSize}
                  style={{ margin: '0 15px' }}
                  key={i}
                />
              </NavLink>
            </Tooltip>
          </ClickDown>
        );
      })}
    </marquee>
  );
};

export default CompanyMarquee;
