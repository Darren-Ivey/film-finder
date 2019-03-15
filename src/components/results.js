import React from 'react';
import "./styles.css";

export default class Results extends React.Component {

    renderSearchError = () => () =>
        <h2>{this.props.searchErrorMsg}</h2>

    renderPosters () {
        const { addToMyList, moreResults, results } = this.props;

        return (
            <div>
                <h2>We found:</h2>
                { results.map(({Poster, Title}, index) =>
                    <div key={`poster-${index}-${Title}`} className="result-container">
                        <div className="poster-container">
                            <img className="poster" alt={Title} src={Poster} />
                        </div>
                        <button onClick={()=> {addToMyList(results[index])}} className="circleButton" type="button">+</button>
                    </div>)}
                <button onClick={moreResults} className="moreButton">More results</button>
            </div>
        )
    }

    render () {
        const { searchError, results } = this.props;

        return (
        <div className="results">
            { searchError ? this.renderSearchError() : results && this.renderPosters() }
        </div>)
    }
}