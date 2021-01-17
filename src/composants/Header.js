// Imports ****************************************************************************************************

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Style -------------
import '../App.css';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, FormGroup, CustomInput } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

// Themes -------------
import ligthTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

// Styles *****************************************************************************************************

// Styles Components -------------

const TopNav = styled.section`
  font-family: ${(props) => props.theme.font};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  height: 50px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.headerColor};
`;

const Logo = styled.h1`
  font-family: ${(props) => props.theme.font};
  font-size : 30px;
  color: #ffffff;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Toggle = styled.section`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: #ffffff;
`;

// Style CSS -------------

const col2 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const col3 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const switchButton = {
  margin: 0, 
  marginLeft: 10,
};

// Function *****************************************************************************************************

function Header(props) {

  // States and var -------------

  const [darkMode, setDarkMode] = useState(props.showDarkMode);
  const [redirectHome, setRedirectHome] = useState(false);

  // Light Mode changing ----------

  const clickOnToogle = () => {
    setDarkMode(!darkMode);
    props.changeLightMode(!darkMode);
    props.clickOnToogle();
  };

  // Redirection ----------

  const clickOnLogo = () => {
    if(window.location.href !== 'http://localhost:3000/') {
      setRedirectHome(true);
    }; 
  };

  if(redirectHome) {
    return (
      <Redirect to='/' />
    );
  };

  // Return *****************************************************************************************************

  return (
    <ThemeProvider theme={darkMode === true ? darkTheme : ligthTheme}>
      <Container fluid>
        <Row>
          <TopNav>
            <Col></Col>
            <Col style={col2}>
              <Logo onClick={() => clickOnLogo()}>Movies</Logo>
            </Col>
            <Col style={col3}>
              <Toggle>
                <FontAwesomeIcon icon={faSun} />
                <Form>
                  <FormGroup style={switchButton}>
                    <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" onChange={() => clickOnToogle()}/>
                  </FormGroup>
                </Form>
                <FontAwesomeIcon icon={faMoon} />
              </Toggle>
            </Col>
          </TopNav>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

// Redux *****************************************************************************************************

function mapDispatchToProps(dispatch) {
  return {
    changeLightMode: function(value) {
        dispatch( {type: 'sendDarkMode', darkMode: value} ) 
    }
  }
};

function mapStateToProps(state) {
  return { showDarkMode: state.darkMode }
};

// Export *****************************************************************************************************

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Header);

