// @ts-check
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EditBtn = (props) => {
  const {handleClick, id} = props
  return(
    <button type="button" onClick={() => {handleClick(id)}} className="btn btn-sm float-right btn-info">
      <FontAwesomeIcon icon={faEdit} />
    </button>
)}

export default EditBtn