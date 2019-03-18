import React from 'react';
import { getVideos } from "../services/network";
import "./styles.css";

export default class Results extends React.Component {

    state = {
        results: undefined,
        loading: false,
        error: undefined,
        searchNumber: 1,
        searchTerm: undefined
    }

    moreResults = (e) => {
        e.preventDefault();

        this.setState({
            loading: true,
            searchNumber: this.state.searchNumber + 1,
        }, () => {
            getVideos(this.props.searchTerm, this.state.searchNumber)
            .then((res) => {
                this.props.handleResponse(res)
                this.setState({
                    loading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                })
            })
        })
    }

    renderSearchError = () => () =>
        <h2>{this.props.searchErrorMsg}</h2>

    renderPosters () {
        const { addToMyList, results } = this.props;
        const { loading } = this.state;

        return (
            <div>
                <div className="results-header">
                    <h2>We found:</h2>
                    { results && <button onClick={this.moreResults} className="moreButton">{ loading ? "Searching" : "More results" }</button> }
                </div>
                { results.map(({Poster, Title}, index) =>
                    <div key={`poster-${index}-${Title}`} className="result-container">
                        <div className="poster-container">
                            <img className="poster" alt={Title} src={Poster} />
                        </div>
                        <button onClick={()=> {addToMyList(results[index])}} className="circleButton" type="button">+</button>
                    </div>)}
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