import React from 'react';
import validUrl from "valid-url";
import "./styles.css";

const renderMissingImage = () =>
    <div className="poster__button poster__button--small">Poster not available</div>

const renderImage =(Title, Poster) =>
    <img title={Title} className="poster" alt={Title} src={Poster} />

const renderMyFilms = (films, removeFromMyList, sortByDate, sortByName) => 
    <div className="my-film">
        <h2>Your collection:</h2> 
        { (films.length > 1) &&
        <div className="my-film__sort-controls">
            <button className="my-film__button" onClick={sortByDate} type="button">sort by date</button> 
            <button className="my-film__button" onClick={sortByName}type="button">sort by name</button>
        </div> }
        {
            films.map(({Poster, Title, imdbID, Year}, index) =>
                <div key={`my-film__poster-${index}-${Title}`} className="my-film__row">
                    <div className="my-film__container">
                        <div className="my-film__poster-container">
                            {validUrl.isUri(Poster) ? renderImage(Title, Poster) : renderMissingImage()}                            
                        </div>
                    </div>
                    <p>{Title} {Year && `(${Year})`}</p>
                    <button onClick={() => { removeFromMyList(imdbID) }} 
                        title="Remove film from your collection" 
                        className="circle-button circle-button--negative" 
                        type="button" />
                </div>)
        }
    </div>

export const MyFilms = ({films, removeFromMyList, sortByDate, sortByName}) => 
    (films.length > 0) ? renderMyFilms(films, removeFromMyList, sortByDate, sortByName) : null;