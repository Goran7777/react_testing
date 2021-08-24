import React from 'react';
import './AlertBanner.scss';

interface IProps {
  message?: string;
  variant?: string;
}

const AlertBanner: React.FC<IProps> = ({ message, variant }) => {
  // const alertMessage =
  //   message || 'An unexpected error ocurred.Please try again later.';
  // const alertVariant = variant || 'danger';
  return (
    <div className="alert">
      <p style={{ backgroundColor: 'red', color: 'white' }}>{message}</p>
    </div>
  );
};

export default AlertBanner;
