import React from 'react';
import "./styles.css";

const defaultResultMsg = () =>
    <h2>There is nothing to see here</h2>

const renderPosters = (films) => 
    films.map(({Poster, Title}, index) => 
        <div key={`poster-${index}`}className="poster-container">
            <img className="poster" alt={Title} src={Poster} />
        </div>
    ) 

const renderResults = (results) => 
    results ? renderPosters(results) : defaultResultMsg();

const renderSearchError = (searchErrorMsg) =>
    <h2>{searchErrorMsg}</h2>

const Results = ({results, searchErrorMsg, searchError}) => 
    searchError ? renderSearchError(searchErrorMsg) : renderResults(results);

export default Results;