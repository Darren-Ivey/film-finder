import React from 'react';
import Form from '../components/form';
import Results from '../components/results';
import Error from '../components/error';

export class SearchPage extends React.Component {

    state = {
        results: undefined,
        searchError: false,
        serviceError: false,
        searchErrorMsg: "",
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

    render() {
        return (
            <div>
                <Form
                    handleResponse={this.handleResponse} />
                { this.state.serviceError && <Error /> }
                <Results
                    searchError={this.state.searchError}
                    searchErrorMsg={this.state.searchErrorMsg}
                    results={this.state.results} />
            </div>
        )
    }
}
