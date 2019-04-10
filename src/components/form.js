import React, { useState } from 'react';
import { getVideos } from "../services/network";
import Autosuggest from 'react-autosuggest';

export const Form = ({ handleResponse, setParentSearchTerm }) => {

    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([])

    const filmNames = [
        {
            name: "alien",
        },
        {
            name: "aliens",
        },
        {
            name: "alien3",
        }
    ];

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : filmNames.filter(film =>
            film.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const renderSuggestion = (suggestion) =>
        <div className="suggestions">
            {suggestion.name}
        </div>

    const getSuggestionValue = (suggestion) => 
        suggestion.name;

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