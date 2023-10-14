// @ts-check
import React, { useEffect } from 'react';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux/es/exports';
import { useTranslation } from 'react-i18next';

import actions from '../actions';
import EditBtn from './Buttons/EditBtn';

const UserCard = () => {
  const {userName, url, userId} = useSelector(state => state.chatState);
  console.log(`${url}`)
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleUpload = () => {
    dispatch(actions.modalStateProfile());
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <EditBtn handleClick={handleUpload} id={userId} />
    </Tooltip>
  );

  return (
  <section className="vh-25" >
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div >
          <div className="card" style={{'borderRadius': "15px"}}>
            <OverlayTrigger placement="right"
                            delay={{ show: 500, hide: 1000 }}
                            overlay={renderTooltip}>
              <div className="card-body text-center">
                <div className="mt-3 mb-4">
                  <Image src={url}
                  className="img-fluid" style={{"width": "100px"}} />
                </div>
                <h4 className="mb-2">{t("logUser")} {userName}</h4>
              </div>
            </OverlayTrigger>
          </div>

        </div>
      </div>
    </div>
  </section>
  );
}

export default UserCard;
