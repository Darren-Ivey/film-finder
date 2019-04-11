import React, { useReducer } from 'react';
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
                searchIndex: payload.searchIndex || state.searchIndex,
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
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                searchTerm: payload,
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                modalOpen: true,
                filmForModal: payload,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalOpen: false,
                filmForModal: undefined,
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
        case 'INCREASE_SEARCH_INDEX':
            return {
                ...state,
                searchIndex: (state.searchIndex + 1),
            }
        default:
            throw new Error();
        };
    }

    const [state, dispatch] = useReducer(stateReducer, initialState);

    // Action dispatchers
    const handleSearch = (response, searchIndex) => {
        if (!response.Error) {
            dispatch({
                type: 'SEARCH_SUCCESS', 
                payload: { 
                    results: response.Search,
                    searchIndex,
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

    const setSearchTerm = (searchTerm) => {
        dispatch({type: 'SET_SEARCH_TERM', payload: searchTerm});
    }

    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'});
    }

    const openModal = (filmForModal) => {
        dispatch({type: 'OPEN_MODAL', payload: filmForModal});
    }

    const sortFilmsByDate = () => {
        dispatch({type: 'SORT_BY_DATE'});
    }

    const sortFilmsByName = () => {
        dispatch({type: 'SORT_BY_NAME'});
    }

    const setSearchIndex = () => {
        dispatch({type: 'INCREASE_SEARCH_INDEX'});
    }

    return (
        <div>
            <Form
                setParentSearchTerm={setSearchTerm}
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
                    openModal={openModal}
                    searchIndex={state.searchIndex} 
                    setSearchIndex={setSearchIndex}/>
                <MyFilms
                    openModal={openModal}
                    sortByDate={sortFilmsByDate}
                    sortByName={sortFilmsByName}
                    removeFromMyList={removeFromMyList}
                    films={state.selectedFilms}/>
            </div>
            <Modal
                ariaHideApp={false}
                className="modal"
                isOpen={state.modalOpen}
                onRequestClose={closeModal}
                >
                <div className="modal__inner">
                    <button className="modal__close" onClick={closeModal}>X</button>
                    { state.filmForModal && <img title={state.filmForModal.Title} className="modal__poster" alt={state.filmForModal.Title} src={state.filmForModal.Poster} /> }
                    { state.filmForModal && <p className="modal__title">{state.filmForModal.Title} {state.filmForModal.Year && `(${state.filmForModal.Year})`}</p>}
                </div>
            </Modal>
        </div>
    )
}
