import React from 'react';
import validUrl from "valid-url";
import "./styles.css";

const renderMissingImage = () =>
    <div className="poster__button poster__button--small">Poster not available</div>

const renderImage =(Title, Poster) =>
    <img title={Title} className="poster" alt={Title} src={Poster} />

const renderMyFilms = (films, removeFromMyList) => 
    <div className="my-film">
        <h2>Your collection:</h2>
        {
            films.map(({Poster, Title}, index) =>
                <div key={`my-film__poster-${index}-${Title}`} className="my-film__row">
                    <div className="my-film__container">
                        <div className="my-film__poster-container">
                            {validUrl.isUri(Poster) ? renderImage(Title, Poster) : renderMissingImage()}                            
                        </div>
                    </div>
                    <p>{Title}</p>
                    <button onClick={() => {removeFromMyList(index)}} 
                        title="Remove film to your collection" 
                        className="circle-button circle-button--negative" 
                        type="button">x</button>
                </div>)
        }
    </div>

export const MyFilms = ({films, removeFromMyList}) => 
    (films.length > 0) ? renderMyFilms(films, removeFromMyList) : null;