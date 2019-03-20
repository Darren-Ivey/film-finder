import React from 'react';
import Form from '../components/form';
import Results from '../components/results';
import Error from '../components/error';
import MyFilms from '../components/myfilms';

export class SearchPage extends React.Component {

    state = {
        searchTerm: undefined,
        results: undefined,
        searchError: false,
        serviceError: false,
        searchErrorMsg: "",
        selectedFilms: [],
    }

    handleResponse = (response) => {
        if (!response.Error) {
            this.setState({
                searchError: false,
                serviceError: false,
                searchErrorMsg: "",
                results: response.Search
            })
        } else {
            this.setState({
                searchError: true,
                searchErrorMsg: response.Error,
            })
        }
    }

    addToMyList = (film) => {
        const {selectedFilms} = this.state;
    
        const isAlreadyInList = (film) =>
            selectedFilms.some((selectedFilm) =>
                film.imdbID === selectedFilm.imdbID)
        

        if (!isAlreadyInList(film)) {
            this.setState({
                selectedFilms: [...selectedFilms, film]
            }, () => {
                console.log(
                    this.state)}
            )
        }
    }

    setSearchTerm = (searchTerm) => {
        this.setState({
            searchTerm
        })
    }

    render() {
        return (
            <div>
                <Form
                    setParentSearchTerm={this.setSearchTerm}
                    handleResponse={this.handleResponse} />
                    { this.state.serviceError && <Error /> }
                <div className="film-view">
                    <Results
                        handleResponse={this.handleResponse}
                        searchError={this.state.searchError}
                        searchErrorMsg={this.state.searchErrorMsg}
                        results={this.state.results}
                        addToMyList={this.addToMyList}
                        searchTerm={this.state.searchTerm}/>
                    <MyFilms
                        films={this.state.selectedFilms}/>
                </div>
            </div>
        )
    }
}
