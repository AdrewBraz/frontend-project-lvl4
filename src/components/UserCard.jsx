// @ts-check
import React, { useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux/es/exports';
import { useTranslation } from 'react-i18next';

import actions from '../actions';


function UserCard() {
  const {userName, url} = useSelector(state => state.chatState);
  // const url = useSelector(state => state.chatState.url);
  console.log(`${url}`)
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleUpload = () => {
    dispatch(actions.modalStateProfile());
  };
  return (
  <section className="vh-25" >
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div >

          <div className="card" style={{'borderRadius': "15px"}}>
            <div className="card-body text-center">
              <div className="mt-3 mb-4">
                <Image onClick={() => { handleUpload()}} src={url}
                className="img-fluid" style={{"width": "100px"}} />
              </div>
              <h4 className="mb-2">{t("logUser")} {userName}</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  );
}

export default UserCard;
