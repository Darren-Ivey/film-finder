import React, { useReducer } from 'react';
import { Form } from '../components/form';
import { Results } from '../components/results';
import { Error } from '../components/error';
import { MyFilms } from '../components/myfilms';
import Modal from 'react-modal';

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
    };

    // Helper functions
    const removeFilm = (id, selectedFilms) =>
        selectedFilms.filter((film) => 
            film.imdbID !== id
        );
 
    const sortByDate = (selectedFilms) =>
        selectedFilms.sort((a, b) => {
            const dateA = new Date(a.Year.slice(0, 4));
            const dateB = new Date(b.Year.slice(0, 4));
            return dateA - dateB;
        });

    const sortByName = (selectedFilms) => 
        selectedFilms.sort((a, b) => {
                const titleA = a.Title.toLowerCase()
                const titleB = b.Title.toLowerCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
        });

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
                results: [],
                serviceError: true,
                searchErrorMsg: payload,
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
