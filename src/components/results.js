import React, { useState, useEffect } from 'react';
import { getVideos } from "../services/network";
import validUrl from "valid-url";
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

    const renderImage = (Title, Poster) =>
        <img title={Title} className="poster poster--hover" alt={Title} src={Poster} />

    const renderMissingImage = () =>
        <div className="poster__button">Poster not available</div>

    const renderSearchError = () =>
        <h2>{searchErrorMsg}</h2>

    const openModalIfValidUrl = (Film) => {
        if(validUrl.isUri(Film.Poster)) {
            openModal(Film);
        }
    }

    const renderPosters = () => (
        <div>
            <div className="results__header">
                <h2>We found:</h2>
                { results && <button onClick={moreResults} className="more-button">{ loading ? "searching" : "more results >" }</button> }
            </div>
            { results.map((Film, index) => {
                const validImgUrl = validUrl.isUri(Film.Poster);
                return (
                    <div key={`poster-${index}-${Film.Title}`} className="results__container">
                        <div className="poster__title">{Film.Title}</div>
                        <div onClick={() => {openModalIfValidUrl(Film)}} className="poster__container" style={validImgUrl && {cursor: "pointer"}}>
                            {validImgUrl ? renderImage(Film.Title, Film.Poster) : renderMissingImage()}
                        </div>
                        <button title="Add film to your collection" onClick={()=> {addToMyList(results[index])}} className="circle-button circle-button--positive" type="button" />
                    </div>
                )
            })}
        </div>)

    return (
        <div className="results">
            { searchError ? renderSearchError() : results && renderPosters() }
        </div>)
}