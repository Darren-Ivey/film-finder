import React from 'react';
import validUrl from "valid-url";
import "./styles.css";

const renderMissingImage = () =>
    <div className="poster-not-available poster-not-available--small">Poster not available</div>

const renderImage =(Title, Poster) =>
    <img title={Title} className="poster" alt={Title} src={Poster} />

const renderMyFilms = (films) => 
    <div className="film-collection">
        <h2>Your collection:</h2>
        {
            films.map(({Poster, Title}, index) =>
                <div key={`my-film-poster-${index}-${Title}`} className="my-film-row">
                    <div className="my-film-container">
                        <div className="poster-container">
                            {validUrl.isUri(Poster) ? renderImage(Title, Poster) : renderMissingImage()}                            
                        </div>
                    </div>
                    <p>{Title}</p>
                </div>)
        }
    </div>

export const MyFilms = ({films}) => 
    (films.length > 0) ? renderMyFilms(films) : null;