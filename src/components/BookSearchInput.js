import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SEARCH_TERMS from '../SEARCH_TERMS';
import Autosuggest from 'react-autosuggest';

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : SEARCH_TERMS.filter(term =>
        term.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

class BookSearchInput extends Component {
    state = {
        value: '',
        suggestions: []
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.props.handleQueryUpdate(suggestionValue)
    };

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Search by title or author',
            value,
            onChange: this.onChange
        };

        return (
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={this.onSuggestionSelected}
                    />
                </div>
            </div>
        );
    }
}

export default BookSearchInput;