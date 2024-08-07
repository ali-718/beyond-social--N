import React, { useRef } from 'react';
import './Hoc.css';
import { useLocation } from 'react-router-dom';

export const NoAuthHoc = (props) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="slideIn">
      {props.children}
    </div>
  );
};
