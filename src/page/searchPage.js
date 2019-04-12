import React, { useReducer, useCallback } from 'react';
import { Form } from '../components/form';
import { Results } from '../components/results';
import { Error } from '../components/error';
import { MyFilms } from '../components/myfilms';
import Modal from 'react-modal';
import { removeFilm, sortByDate, sortByName, isDuplicate } from '../helpers/helpers';

export const SearchPage = () => {
    const initialState = {
        searchTerm: undefined,
        results: [],
        searchError: false,
        serviceError: false,
        searchErrorMsg: "",
        selectedFilms: [],
        modalOpen: false,
        filmForModal: undefined,
        searchIndex: 1,
    };

    const stateReducer = (state, {type, payload}) => {
        switch (type) {
        case 'SEARCH_SUCCESS':
            return {
                ...state, 
                results: payload.results,
                searchError: false,
                serviceError: false,
                searchErrorMsg: "",
                searchIndex: payload.searchIndex,
                searchTerm: payload.searchTerm || state.searchTerm,
            };
        case 'SEARCH_FAIL':
            return {
                ...state,
                results: [],
                serviceError: true,
                searchErrorMsg: payload,
                searchIndex: 1,
            };
        case 'SELECT_FILM':
            return {
                ...state,
                selectedFilms: [...state.selectedFilms, payload],
            };
        case 'REMOVE_FILM':
            return {
                ...state,
                selectedFilms: removeFilm(payload, state.selectedFilms),
            };
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modalOpen: !state.modalOpen,
                filmForModal: payload || undefined,
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                selectedFilms: sortByDate(state.selectedFilms),
            };
        case 'SORT_BY_NAME':
            return {
                ...state,
                selectedFilms: sortByName(state.selectedFilms),
            };
        default:
            throw new Error();
        };
    }

    const [state, dispatch] = useReducer(stateReducer, initialState);

    const handleSearch = (response, searchIndex, searchTerm) => {
        if (!response.Error) {
            dispatch({
                type: 'SEARCH_SUCCESS', 
                payload: { 
                    results: response.Search,
                    searchIndex,
                    searchTerm,
                }});
        } else {
            dispatch({type: 'SEARCH_FAIL', payload: response.Error});
        }
    }

    const addToMyList = (film) => {    
        if (!isDuplicate(film, state.selectedFilms)) {
            dispatch({type: 'SELECT_FILM', payload: film});
        }
    }

    const removeFromMyList = (id) =>
        dispatch({type: 'REMOVE_FILM', payload: id});

    const toggleModal = useCallback((filmForModal) => {
        dispatch({type: 'TOGGLE_MODAL', payload: filmForModal});
    }, []);

    const sortFilmsByDate = () => {
        dispatch({type: 'SORT_BY_DATE'});
    }

    const sortFilmsByName = () => {
        dispatch({type: 'SORT_BY_NAME'});
    }

    return (
        <div>
            <Form
                handleSearch={handleSearch} />
                { state.serviceError && <Error /> }
            <div className="film__view">
                <Results
                    handleSearch={handleSearch}
                    searchError={state.searchError}
                    searchErrorMsg={state.searchErrorMsg}
                    results={state.results}
                    addToMyList={addToMyList}
                    searchTerm={state.searchTerm}
                    openModal={toggleModal}
                    searchIndex={state.searchIndex} />
                <MyFilms
                    openModal={toggleModal}
                    sortByDate={sortFilmsByDate}
                    sortByName={sortFilmsByName}
                    removeFromMyList={removeFromMyList}
                    films={state.selectedFilms}/>
            </div>
            <Modal
                ariaHideApp={false}
                className="modal"
                isOpen={state.modalOpen}
                >
                <div className="modal__inner">
                    <button className="modal__close" onClick={toggleModal}>X</button>
                    { state.filmForModal && 
                        <div>
                            <img title={state.filmForModal.Title} className="modal__poster" alt={state.filmForModal.Title} src={state.filmForModal.Poster} />
                            <p className="modal__title">{state.filmForModal.Title} {state.filmForModal.Year && `(${state.filmForModal.Year})`}</p>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    )
}
