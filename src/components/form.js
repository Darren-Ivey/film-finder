import React from 'react';
import { getVideos } from "../services/network";

export default class Form extends React.Component {

    state = {
        searchTerm: "star wars",
        results: undefined,
        loading: false,
    }

    handleInputChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loading: true,
        }, () => {
            getVideos(this.state.searchTerm)
            .then((res) => {
                this.props.handleResponse(res)
                this.setState({
                    loading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                }, () => {
                    this.props.handleError();
                })
            })
        })

    }

    render() {
        const { loading, searchTerm } = this.state;
        return (
            <div className="filmFinder">
                <h1>Find films!</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input 
                        onChange={this.handleInputChange} 
                        type="search" name="search-movies" 
                        value={searchTerm} />
                    <button disabled={loading} type="submit">
                        { loading ? "Finding films" : "Search" }
                    </button>
                </form>
            </div>
        )
    }
}
