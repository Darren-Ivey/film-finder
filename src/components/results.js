import React, { useState, useEffect } from 'react';
import { getVideos } from "../services/network";
import { PosterImage } from "./posterImage";

import "./styles.css";

export const Results = ({ searchTerm, handleResponse, addToMyList, results, searchError, searchErrorMsg, openModal }) => {

    const [loading, setLoading] = useState(false);
    const [searchNumber, setSearchNumber] = useState(1);
 
    useEffect(() => {
        if (searchNumber > 1 && loading) {
            getVideos(searchTerm, searchNumber)
            .then((res) => {
                handleResponse(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
        }
    });

    const moreResults = (e) => {
        e.preventDefault();
        setLoading(true);
        setSearchNumber(searchNumber + 1);
    }

    const renderSearchError = () =>
        <h2>{searchErrorMsg}</h2>


    const renderPosters = () => (
        <div>
            <div className="results__header">
                <h2>We found:</h2>
                { results && <button onClick={moreResults} className="more-button">{ loading ? "searching" : "more results >" }</button> }
            </div>
            { results.map((Film, index) => {
                return (
                    <div key={`poster-${index}-${Film.Title}`} className="results__container">
                        <div className="poster__title">{Film.Title}</div>
                            <PosterImage
                                Film={Film}
                                openModal={openModal}/>
                        <button title="Add film to your collection" onClick={()=> {addToMyList(results[index])}} className="circle-button circle-button--positive" type="button" />
                    </div>
                )
            })}
        </div>)

    return (
        <div className="results">
            { searchError ? renderSearchError() : results.length > 0 && renderPosters() }
        </div>)
}