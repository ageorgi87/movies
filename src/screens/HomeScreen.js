// Imports ****************************************************************************************************

import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

// Style -------------
import '../App.css';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Input } from 'reactstrap';

// Composants -------------
import Header from '../composants/Header';
import FilmCard from '../composants/FilmCard';

// Themes -------------
import ligthTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

// Data -------------
import apiKey from '../data/apiKey'

// Styles *****************************************************************************************************

// Styles Components -------------

const Body = styled.section`
  font-family: ${(props) => props.theme.font};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

// Style CSS -------------

const movieListStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "40px",
};

const queryInputStyle = {
  width: "100%",
  margin: "15px"
};

// FUNCTION ************************************************************************************************

function HomeScreen(props) {

  // States and vars -------------

  const request = require('sync-request');
  const [darkMode, setDarkMode] = useState(props.showDarkMode);
  const [filmList, setFilmList] = useState([]);
  const [titleRequest, setTitleRequest] = useState('');

  // Launching functions  -------------

  useEffect(() => {
    popularMovieListCreation();
  }, []);

  // Title request to the API -------------

  useEffect(() => {
    if(titleRequest != '') {
      requestedMovieListCreation();
    } else {
      popularMovieListCreation();
    };
  }, [titleRequest]);

  // Light Mode changing -------------

  const clickOnToogle = () => {
    setDarkMode(!darkMode)
  };

  // Creat the popular movies list -------------

  const popularMovieListCreation = () => {
    const result = request("GET", `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`);
    let resultObject = JSON.parse(result.getBody());

    let actualFilmList = [];
    for (let i=0; i < resultObject.results.length; i++) {
      let posterURL;
      if( resultObject.results[i].poster_path == undefined) {
        posterURL = 'no-poster.jpg';
      } else {
        posterURL = `https://image.tmdb.org/t/p/w500/${resultObject.results[i].poster_path}`;
      };
      let newFilmBlock = (
        <FilmCard darkMode={darkMode} src={posterURL} id={resultObject.results[i].id} title={resultObject.results[i].title} key={i}/>
      );
      actualFilmList.push(newFilmBlock);
    };
    setFilmList(actualFilmList);
  };

  // Creat the requested movies list -------------

  const requestedMovieListCreation = () => {
    const result = request("GET", `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&page=1&include_adult=false&query=${titleRequest}`);
    let resultObject = JSON.parse(result.getBody());

    let actualFilmList = [];
    for (let i=0; i < resultObject.results.length; i++) {
      let posterURL;
      if( resultObject.results[i].poster_path == undefined) {
        posterURL = 'no-poster.jpg'
      } else {
        posterURL = `https://image.tmdb.org/t/p/w500/${resultObject.results[i].poster_path}`;
      };
      let newFilmBlock = (
        <FilmCard darkMode={darkMode} src={posterURL} id={resultObject.results[i].id} title={resultObject.results[i].title} key={i}/>
      );
      actualFilmList.push(newFilmBlock)
    };
    setFilmList(actualFilmList);
  };

// Return *****************************************************************************************************

  return (
    <ThemeProvider theme={darkMode === true ? darkTheme : ligthTheme}>
      <Body>
        <Container fluid>
          <Row>
            <Header clickOnToogle={clickOnToogle}/>
          </Row>
          <Row>
            <Col></Col>
            <Col lg="8" xs="12">
              <Row>
                <Input style={queryInputStyle} type="search" name="query" id="query" placeholder="Recherchez un film" value={titleRequest} onChange={(e) => setTitleRequest(e.target.value)} />
              </Row>
              <Row style={movieListStyle}>
                {filmList}
              </Row>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Body>
    </ThemeProvider>
  );
};

// Redux *****************************************************************************************************

function mapStateToProps(state) {
  return { showDarkMode: state.darkMode }
};

// Export *****************************************************************************************************

export default connect(
  mapStateToProps, 
  null
)(HomeScreen);
