// Imports ****************************************************************************************************

import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

// Style -------------
import '../App.css';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';

// Composants -------------
import Header from '../composants/Header';

// Themes -------------
import ligthTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

// Data -------------
import apiKey from '../data/apiKey';

// Styles *****************************************************************************************************

// Styles Components -------------

const Body = styled.section`
  font-family: ${(props) => props.theme.font};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.fontColor};
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.fontColor};
`;

const Notation = styled.p`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.fontColor};
`;

const Img = styled.img`
  max-width: 100%;
`;

const TextBlock = styled.div`
  width: 65%;
  margin: 20px;
`;

const ImageBlock = styled.div`
  width: 35%;
  max-width: 176px;
  margin: 20px;
`;

// Style CSS -------------

const movieInformationsStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

// FUNCTION ************************************************************************************************

function MovieScreen(props) {

  // States and vars -------------

  const request = require('sync-request');
  const [darkMode, setDarkMode] = useState(props.showDarkMode);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieNotation, setMovieNotation] = useState('');
  const [moviePosterUrl, setMoviePosterUrl] = useState('');

  // Launching functions  -------------

  useEffect(() => {

    // Getting the movie ID in the URL

    var url = window.location.href;
    var urlSplited = url.split('movie-');
    var movieId = urlSplited[urlSplited.length-1];

    //  Getting the movies data

    var result = request("GET", `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`);
    var resultJSON = JSON.parse(result.getBody());

    if(resultJSON.title === undefined || resultJSON.title === '') {
      setMovieTitle("Titre inconnu");
    } else {
      setMovieTitle(resultJSON.title);
    };

    if(resultJSON.overview === undefined  || resultJSON.overview === '') {
      setMovieDescription("Résumé non renseigné");
    } else {
      setMovieDescription(resultJSON.overview);
    };

    if(resultJSON.vote_average === undefined  || resultJSON.vote_average === '') {
      setMovieNotation("-");
    } else {
      setMovieNotation(resultJSON.vote_average);
    };

    if(resultJSON.poster_path === undefined  || resultJSON.poster_path === '') {
      setMoviePosterUrl('no-poster.jpg');
    } else {
      setMoviePosterUrl(`https://image.tmdb.org/t/p/w500/${resultJSON.poster_path}`);
    };

}, []);

// Light Mode changing -------------

const clickOnToogle = () => {
  setDarkMode(!darkMode)
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
            <Col lg="10" xs="12">
              <Row style={movieInformationsStyle}>
                <TextBlock>
                  <Title>{movieTitle}</Title>
                  <Description>{movieDescription}</Description>
                  <Notation>{movieNotation} / 10</Notation>
                </TextBlock>
                <ImageBlock>
                  <Img src={moviePosterUrl} />
                </ImageBlock>
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
)(MovieScreen);
