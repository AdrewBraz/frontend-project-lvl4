// @ts-check
import React, { useRef, useEffect } from 'react';
import axios from '../../http';
import { Modal, Spinner, Alert, Badge, Button } from 'react-bootstrap';


export default (props) => {
    return (
        <Button className="ml-3" 
              variant="primary" 
              type="button" 
              onClick={props.onClickHandler}>
                {props.text}
      </Button>
    )
}