import React, { useState, useEffect } from 'react';
import { getVideos } from "../services/network";
import { PosterImage } from "./posterImage";

import "./styles.css";

export const Results = ({ 
        searchTerm, 
        handleResearch, 
        addToMyList, 
        results, 
        searchError, 
        searchErrorMsg, 
        openModal,
        searchIndex,
        setSearchIndex
    }) => {

    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
        if (searchIndex > 1 && loading) {
            getVideos(searchTerm, searchIndex)
            .then((res) => {
                handleResearch(res);
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
        setSearchIndex(searchIndex + 1);
    }

    const renderSearchError = () =>
        <h2>{searchErrorMsg}</h2>

    const renderPosters = () => (
        <div>
            <div className="results__header">
                <h2>We found:</h2>
                { results && 
                    <button onClick={moreResults} className="more-button">
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