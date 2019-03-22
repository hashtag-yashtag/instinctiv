import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from 'react-router-dom'


class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    userSuggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: [],
    userSuggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],  
      filteredUserSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions, userSuggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });


    //users suggestions
    const filteredUserSuggestions = userSuggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: this.state.activeSuggestion,
      filteredSuggestions,
      filteredUserSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };


  render() {
    const {
      onChange,
      state: {
        activeSuggestion,
        filteredSuggestions,
        filteredUserSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length || filteredUserSuggestions.length) {
        suggestionsListComponent = (
          <div>
            <h5> Stocks </h5>
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                //console.log('sugg', index, activeSuggestion);

                return (
                  <Route render={({ history}) => (
                    <li className={className} key={suggestion} onClick={() => { 
                      this.setState({
                        activeSuggestion: 0,
                        filteredSuggestions: [],
                        showSuggestions: false,
                        userInput: suggestion
                      }); 
                      var str = suggestion.substring(0, suggestion.indexOf(":"));
                      history.push('/stocks/'+str);
                    }}>
                      {suggestion}
                    </li>
                  )} />
                );
              })}
            </ul>
            <h5> Users </h5>
            <ul className="suggestions">
              {filteredUserSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                //console.log('user',index, activeSuggestion);
                if (index === activeSuggestion - filteredSuggestions.length) {
                  className = "suggestion-active";
                }

                return (
                  <Route render={({ history}) => (
                    <li className={className} key={suggestion} onClick={() => { 
                      this.setState({
                        activeSuggestion: 0,
                        filteredSuggestions: [],
                        showSuggestions: false,
                        userInput: suggestion
                      }); 
                      history.push('/user/'+suggestion);
                    }}>
                      {suggestion}
                    </li>
                  )} />
                );
              })}
          </ul>
        </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No results :(</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <Route render={({ history}) => (
                    
          <input
            type="text"
            onChange={onChange}
            onKeyDown={e => {

              const { activeSuggestion, filteredSuggestions, filteredUserSuggestions } = this.state;

              // User pressed the enter key

              
              if (e.keyCode === 13) {
                
                history.push(activeSuggestion >= filteredSuggestions.length ? 
                  '/user/'+filteredUserSuggestions[activeSuggestion-filteredSuggestions.length] :
                  '/stocks/'+filteredSuggestions[activeSuggestion].substring(0, filteredSuggestions[activeSuggestion].indexOf(":")));
                return;
              }


              // User pressed the up arrow
              else if (e.keyCode === 38) {
                if (activeSuggestion === 0) {
                  return;
                }

                this.setState({ activeSuggestion: activeSuggestion - 1 });
              }
              // User pressed the down arrow
              else if (e.keyCode === 40) {
                if (activeSuggestion === (filteredSuggestions.length + filteredUserSuggestions.length-1)) {
                  return;
                }

                this.setState({ activeSuggestion: activeSuggestion + 1 });
              }

            }}
            value={userInput}
          />
        )} />  
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
