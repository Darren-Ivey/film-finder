import React from 'react';
import "./styles.css";

const renderMyFilms = (films) => 
    <div className="film-collection">
        <h2>Your collection:</h2>
        {
            films.map(({Poster, Title}, index) =>
                <div key={`my-film-poster-${index}-${Title}`} className="my-film-row">
                    <div className="my-film-container">
                        <div className="poster-container">
                            <img title={Title} className="poster" alt={Title} src={Poster} />
                        </div>
                    </div>
                    <p>{Title}</p>
                </div>)
        }
    </div>

const MyFilms = ({films}) => 
    (films.length > 0) ? renderMyFilms(films) : null;


export default MyFilms;