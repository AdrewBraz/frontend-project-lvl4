// @ts-check
import React from 'react';
import { Spinner } from 'react-bootstrap';

const renderSpinner = () => (
  <Spinner bsPrefix="d-flex align-items-center justify-content-center fixed-top h-100 w-100">
    <div className="spinner-border p-4 text-info" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </Spinner>
);

export default renderSpinner;
