// @ts-check
import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setLocale } from 'react-redux-i18n';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { locale } = state.i18;
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
      const locale = this.props;
      return (
        <Navbar expand="lg">
          <NavDropdown title="English" id="basic-nav-dropdown">
            <NavDropdown.Item href="#english" onClick={this.handleSwitchLanguage} data-language="en">
              {'english'}
            </NavDropdown.Item>
            <NavDropdown.Item href="#russian" onClick={this.handleSwitchLanguage} data-language="ru">
              {'russian'}
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      );
    }
}
