import React, { useReducer } from 'react';
import { Form } from '../components/form';
import { Results } from '../components/results';
import { Error } from '../components/error';
import { MyFilms } from '../components/myfilms';
import Modal from 'react-modal';

export const SearchPage = () => {
    const initialState = {
        searchTerm: undefined,
        results: undefined,
        searchError: false,
        serviceError: false,
        searchErrorMsg: "",
        selectedFilms: [],
        modalOpen: false,
        filmForModal: undefined,
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
        default:
            throw new Error();
        };
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

    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'});
    }

    const openModal = (filmForModal) => {
        dispatch({type: 'OPEN_MODAL', payload: filmForModal});
    }

    return (
        <div>
            <Form
                setParentSearchTerm={setSearchTerm}
                handleResponse={handleResponse} />
                { state.serviceError && <Error /> }
            <div className="film__view">
                <Results
                    handleResponse={handleResponse}
                    searchError={state.searchError}
                    searchErrorMsg={state.searchErrorMsg}
                    results={state.results}
                    addToMyList={addToMyList}
                    searchTerm={state.searchTerm}
                    openModal={openModal} />
                <MyFilms
                    films={state.selectedFilms}/>
            </div>
            <Modal
                className="modal"
                isOpen={state.modalOpen}
                onRequestClose={closeModal}
                >
                <div className="modal__inner">
                    <button className="modal__close" onClick={closeModal}>X</button>
                    { state.filmForModal && <img title={state.filmForModal.Title} className="poster" alt={state.filmForModal.Title} src={state.filmForModal.Poster} /> }
                </div>
            </Modal>
        </div>
    )
}
