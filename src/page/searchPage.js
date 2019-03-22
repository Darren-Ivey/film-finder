import React, { useState } from 'react';
import Form from '../components/form';
import Results from '../components/results';
import Error from '../components/error';
import MyFilms from '../components/myfilms';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState(undefined);
    const [results, setResults] = useState(undefined);
    const [searchError, setSearchError] = useState(false);
    const [serviceError, setServiceError] = useState(false);
    const [searchErrorMsg, setSearchErrorMsg] = useState("");
    const [selectedFilms, setSelectedFilms] = useState([]);

    const handleResponse = (response) => {
        if (!response.Error) {
            setSearchError(false);
            setServiceError(false);
            setSearchErrorMsg("");
            setResults(response.Search);
        } else {
            setSearchError(true);
            setSearchErrorMsg(response.Error);
        }
    }

    const addToMyList = (film) => {    
        const isAlreadyInList = (film) =>
            selectedFilms.some((selectedFilm) =>
                film.imdbID === selectedFilm.imdbID);
        if (!isAlreadyInList(film)) {
            setSelectedFilms([...selectedFilms, film]);
        }
    }

    return (
        <div>
            <Form
                setParentSearchTerm={setSearchTerm}
                handleResponse={handleResponse} />
                { serviceError && <Error /> }
            <div className="film-view">
                <Results
                    handleResponse={handleResponse}
                    searchError={searchError}
                    searchErrorMsg={searchErrorMsg}
                    results={results}
                    addToMyList={addToMyList}
                    searchTerm={searchTerm}/>
                <MyFilms
                    films={selectedFilms}/>
            </div>
        </div>
    )
}

export default SearchPage;
