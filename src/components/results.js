import React from 'react';
import "./styles.css";

const defaultResultMsg = () =>
    <h2>There is nothing to see here</h2>

const renderPosters = (films, addToMyList) => 
    <div>
        <h2>We found:</h2>
        { films.map(({Poster, Title}, index) =>
            <div key={`poster-${index}-${Title}`} className="result-container">
                <div className="poster-container">
                    <img className="poster" alt={Title} src={Poster} />
                </div>
                <button onClick={()=> {addToMyList(films[index])}} className="circleButton" type="button">+</button>
            </div>)}
    </div>

const renderResults = (results, addToMyList) =>
    <div>
        {results ? renderPosters(results, addToMyList) : defaultResultMsg()}
    </div>

const renderSearchError = (searchErrorMsg) =>
    <h2>{searchErrorMsg}</h2>

const Results = ({results, searchErrorMsg, searchError, addToMyList}) =>
    <div className="results">
        { searchError ? renderSearchError(searchErrorMsg) : renderResults(results, addToMyList) }
    </div>

export default Results;