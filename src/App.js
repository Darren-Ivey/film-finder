import React, { Component } from 'react';
import { SearchPage } from './page/searchPage';
import { ErrorBoundary } from './components/errorBoundary'; 

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    );
  }
}
