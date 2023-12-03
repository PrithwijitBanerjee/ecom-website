import React from 'react';
import "../Css/offlineStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
const Offline = ({ msg }) => {
  return (
    <div className="offline-container">
      <FontAwesomeIcon icon={faExclamationTriangle} size='4x' className="offline-icon" />
      <h1>You are Offline</h1>
      <h3>Please Check Your Internet Connection</h3>
    </div>
  );
};

export default Offline;