import React, { useState } from 'react';
import { getVideos } from "../services/network";
import { PosterImage } from "./posterImage";

import "./styles.css";

export const Results = ({ 
        searchTerm, 
        handleSearch, 
        addToMyList, 
        results, 
        searchError, 
        searchErrorMsg, 
        openModal,
        searchIndex
    }) => {

    const [loading, setLoading] = useState(false);
 
    const moreResults = () => {
        setLoading(true);

        getVideos(searchTerm, searchIndex + 1)
        .then((res) => {
            handleSearch(res, searchIndex + 1);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        })
    }

    const renderSearchError = () =>
        <h2>{searchErrorMsg}</h2>

    const renderPosters = () => (
        <div>
            <div className="results__header">
                <h2>We found:</h2>
                { results && 
                    <button type="submit" onClick={moreResults} className="more-button">
                        { loading ? "searching" : "more results >" }
                    </button> }
            </div>
            { results.map((Film, index) => {
                return (
                    <div key={`poster-${index}-${Film.Title}`} className="results__container">
                        <div className="poster__title">{Film.Title}</div>
                            <div className="poster__container">
                                <PosterImage
                                    Film={Film}
                                    openModal={openModal}/>
                            </div>
                        <button title="Add film to your collection"
                            onClick={()=> {addToMyList(results[index])}} 
                            className="circle-button circle-button--positive" 
                            type="button" />
                    </div>
                )
            })}
        </div>)

    return (
        <div className="results">
            { searchError ? renderSearchError() : results.length > 0 && renderPosters() }
        </div>)
}