// Imports ****************************************************************************************************

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Style -------------
import '../App.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styles *****************************************************************************************************

// Styles Components -------------

const MovieBlock = styled.section`
  font-family: ${(props) => props.theme.font};
  padding: 5px 5px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.titleColor};
  font-weight: ${(props) => props.theme.titleWeight};
`;

// Style CSS -------------------

const imgStyle = {
  maxWidth: "176px",
 };
 
const imgHoverStyle = {
  maxWidth: "176px",
  filter: "opacity(20%)",
};

const titleStyle = {
  position:"absolute", 
  top:20, 
  width:"100%", 
  height: "100%", 
  zIndex:2, 
  textAlign: "center",
  padding: 5,
};

const displayNone = {
  display: "none"
};

// Function *****************************************************************************************************

function FilmCard(props) {

  // States and var -------------

  const [filterFilmPicture, setFilterFilmPicture] = useState(false);
  const [redirectToMovieScreen, setRedirectToMovieScreen] = useState(false);
  const [movieUrl, setMovieUrl] = useState(false);

  // MouseOver on a movie -------------

  const mouseIsOnFilm = () => {
    setFilterFilmPicture(!filterFilmPicture);
  };

  // Clicking on a movie -------------

  const clickOnMovie = () => {
    setMovieUrl("movie-" + props.id);
    setRedirectToMovieScreen(true);
  };

  if(redirectToMovieScreen) {
    return (
      <Redirect to={movieUrl} />
    );
  };

  // Return *****************************************************************************************************

  return (
    <MovieBlock>
      <div style={{position: "relative"}} onMouseEnter={() => mouseIsOnFilm()} onMouseLeave={() => mouseIsOnFilm()} onClick={() => clickOnMovie()} >
        <img alt={props.title} style={filterFilmPicture === false ? imgStyle : imgHoverStyle} src={props.src} id={props.id} title={props.title}/>
        <div style={filterFilmPicture === false ? displayNone : titleStyle}>
            <Title>{props.title}</Title>
        </div>
      </div>
    </MovieBlock>
  );
};

// Export *****************************************************************************************************

export default FilmCard;
