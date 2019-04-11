import React, { useState } from 'react';
import { getVideos, getWords } from "../services/network";
import Autosuggest from 'react-autosuggest';

export const Form = ({ handleResponse, setParentSearchTerm }) => {

    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const topTenSuggestions = (words) =>
        words.slice(0, 10);

    const onSuggestionsFetchRequested = ({ value }) => {
        getWords(value.trim())
            .then((res) => {
                setSuggestions(topTenSuggestions(res));
            })
            .catch((error) => {
                // Silently fail
                onSuggestionsClearRequested();
                setLoading(false);
            })
    };

    const renderSuggestion = ({word}) =>
        <div className="suggestions">
            {word}
        </div>

    const getSuggestionValue = (suggestion) => 
        suggestion.word;

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setParentSearchTerm(value.trim().toLowerCase());

        getVideos(value.trim())
            .then((res) => {
                handleResponse(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    const inputProps = {
        placeholder: 'Search',
        value,
        onChange,
    };

    const theme = {
        container: "search__input",
        suggestionsContainer: "search__suggestions-container",
        suggestionsList: "search_suggestions-list",
        suggestionHighlighted: "search_suggestion-highlighted"
    };

    return (
        <div className="film__finder"> 
            <h1>Find films!</h1>
            <form className="search-form" onSubmit={handleSubmit}>
                <Autosuggest
                    theme={theme}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    />
                <button className="search__button" disabled={loading}>
                    { loading ? "finding" : "search" }
                </button>
            </form>
        </div>
    )
}