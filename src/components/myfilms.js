import React from 'react';
import "./styles.css";

const renderMyFilms = (films) => 
    <div className="film-collection">
        <h2>Your collection:</h2>
        {
            films.map(({Poster, Title}, index) =>
                <div key={`myfilm-poster-${index}-${Title}`}  className="result-container">
                    <div className="poster-container">
                        <img className="poster" alt={Title} src={Poster} />
                    </div>
                </div>)
        }
    </div>

const renderEmpty = () =>
    <h2>No films selected</h2>

const MyFilms = ({films}) => 
    films.length > 0 ? renderMyFilms(films) : renderEmpty()


export default MyFilms;