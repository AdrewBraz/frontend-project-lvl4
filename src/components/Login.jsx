// @ts-check
import React from "react";
import { Spinner, Alert, NavItem, Nav, Tab} from 'react-bootstrap';

import SignInForm from "./SignInForm";

const Login = () => {
    const cardStyle = {
      marginTop: "-100px",
      background: "hsla(0, 0%, 100%, 0.8)",
      backdropFilter: "blur(30px)"
    }

    const backgroundStyle = {
      backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
      height: "300px"
    }

    return (
          <section className="text-center">
            <div className="p-5 bg-image" style={backgroundStyle}></div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={cardStyle}>
              <div className="card-body py-5 px-md-5">
                <Tab.Container defaultActiveKey="login">
                  <div className="nav nav-pills nav-justified mb-3">
                    <NavItem >
                      <Nav.Link eventKey="login">Login</Nav.Link>
                    </NavItem>
                    <NavItem >
                      <Nav.Link eventKey="registration">Register</Nav.Link>
                    </NavItem>
                  </div>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <SignInForm path='login'/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="registration">
                    <SignInForm path='registration'/>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              </div>
            </div>
          </section>
    )
}

export default Login;