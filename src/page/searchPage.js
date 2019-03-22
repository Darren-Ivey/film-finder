import React, { useReducer } from 'react';
import Form from '../components/form';
import Results from '../components/results';
import Error from '../components/error';
import MyFilms from '../components/myfilms';

const SearchPage = () => {
    const initialState = {
        searchTerm: undefined,
        results: undefined,
        searchError: false,
        serviceError: false,
        searchErrorMsg: "",
        selectedFilms: [],
    };

    const stateReducer = (state, {type, payload}) => {
        switch (type) {
        case 'SEARCH_SUCCESS':
            return {
                ...state, 
                results: payload,
                searchError: false,
                serviceError: false,
                searchErrorMsg: "",
            };
        case 'SEARCH_FAIL':
            return {
                ...state,
                results: null,
                serviceError: true,
                searchErrorMsg: payload,
            };
        case 'SELECT_FILM':
            return {
            ...state,
            selectedFilms: [...state.selectedFilms, payload],
        };
        case 'SET_SEARCH_TERM':
            return {
            ...state,
            searchTerm: payload,
        };
          default:
            throw new Error();
        }
    }

    const [state, dispatch] = useReducer(stateReducer, initialState);

    const handleResponse = (response) => {
        if (!response.Error) {
            dispatch({type: 'SEARCH_SUCCESS', payload: response.Search});
        } else {
            dispatch({type: 'SEARCH_FAIL', payload: response.Error});
        }
    }

    const addToMyList = (film) => {    
        const isAlreadyInList = (film) =>
            state.selectedFilms.some((selectedFilm) =>
                film.imdbID === selectedFilm.imdbID);
        if (!isAlreadyInList(film)) {
            dispatch({type: 'SELECT_FILM', payload: film});
        }
    }

    const setSearchTerm = (searchTerm) => {
        dispatch({type: 'SET_SEARCH_TERM', payload: searchTerm});
    }

    return (
        <div>
            <Form
                setParentSearchTerm={setSearchTerm}
                handleResponse={handleResponse} />
                { state.serviceError && <Error /> }
            <div className="film-view">
                <Results
                    handleResponse={handleResponse}
                    searchError={state.searchError}
                    searchErrorMsg={state.searchErrorMsg}
                    results={state.results}
                    addToMyList={addToMyList}
                    searchTerm={state.searchTerm}/>
                <MyFilms
                    films={state.selectedFilms}/>
            </div>
        </div>
    )
}

export default SearchPage;
