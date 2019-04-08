import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Better crack open that developer console!</h1>;
        }
        return this.props.children; 
    }
}