import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Sorry, there has been an error with out app...</h1>;
        }
        return this.props.children; 
    }
}