// @ts-check
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import i18n from '../i18n';


const Select = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        {i18n.language}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#english" onClick={() => changeLanguage('en')} data-language="en">English</Dropdown.Item>
        <Dropdown.Item href="#russian" onClick={() => changeLanguage('ru')} data-language="ru">Russian</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withTranslation()(Select);
