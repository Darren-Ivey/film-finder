import React, { useState, useEffect } from 'react';
import { getVideos } from "../services/network";
import validUrl from "valid-url";
import "./styles.css";

const Results = ({ searchTerm, handleResponse, addToMyList, results, searchError, searchErrorMsg }) => {

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

    const renderImage = (Title, Poster) =>
        <img title={Title} className="poster poster-hover" alt={Title} src={Poster} />

    const renderMissingImage = () =>
        <div className="poster-not-available">Poster not available</div>

    const renderSearchError = () =>
        <h2>{searchErrorMsg}</h2>

    const renderPosters = () => (
        <div>
            <div className="results-header">
                <h2>We found:</h2>
                { results && <button onClick={moreResults} className="more-button">{ loading ? "Searching" : "More results >" }</button> }
            </div>
            { results.map(({Poster, Title}, index) =>
                <div key={`poster-${index}-${Title}`} className="result-container">
                    <div className="poster-title">{Title}</div>
                    <div className="poster-container">
                        {validUrl.isUri(Poster) ? renderImage(Title, Poster) : renderMissingImage()}
                    </div>
                    <button onClick={()=> {addToMyList(results[index])}} className="circle-button" type="button">+</button>
                </div>)}
        </div>)

    return (
        <div className="results">
            { searchError ? renderSearchError() : results && renderPosters() }
        </div>)
}

export default Results;