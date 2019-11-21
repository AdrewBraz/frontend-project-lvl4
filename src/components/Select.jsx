// @ts-check
import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setLocale } from 'react-redux-i18n';
import { Dropdown } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { locale } = state.i18n;
  const props = { locale };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const actions = { setLocale };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default @connect(mapStateToProps, mapDispatchToProps)
class Select extends React.Component {
    handleSwitchLanguage = (e) => {
      e.preventDefault();
      const { language } = e.target.dataset;
      const { actions } = this.props;
      actions.setLocale(language);
    }

    render() {
      const { locale } = this.props;
      return (
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            {locale}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#english" onClick={this.handleSwitchLanguage} data-language="en">English</Dropdown.Item>
            <Dropdown.Item href="#russian" onClick={this.handleSwitchLanguage} data-language="ru">Russian</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
}
