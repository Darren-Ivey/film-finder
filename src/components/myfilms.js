import React from 'react';
import "./styles.css";
import { PosterImage } from "./posterImage";

const renderMyFilms = (films, removeFromMyList, sortByDate, sortByName) => 
    <div className="my-film">
        <h2>Your collection:</h2> 
        { (films.length > 1) &&
        <div className="my-film__sort-controls">
            <button className="my-film__button" onClick={sortByDate} type="button">sort by date</button> 
            <button className="my-film__button" onClick={sortByName}type="button">sort by name</button>
        </div> }
        {
            films.map((Film, index) =>
                <div key={`my-film__poster-${index}-${Film.Title}`} className="my-film__row">
                    <div className="my-film__container">
                        <div className="my-film__poster-container">
                            <PosterImage
                                small={true}
                                Film={Film} />
                        </div>
                    </div>
                    <p className="my-film__details">{Film.Title} {Film.Year && `(${Film.Year})`}</p>
                    <button onClick={() => { removeFromMyList(Film.imdbID) }} 
                        title="Remove film from your collection" 
                        className="circle-button circle-button--negative" 
                        type="button" />
                </div>)
        }
    </div>

export const MyFilms = ({films, removeFromMyList, sortByDate, sortByName}) => 
    (films.length > 0) ? renderMyFilms(films, removeFromMyList, sortByDate, sortByName) : null;