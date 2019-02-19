import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
<<<<<<< HEAD
import App from './App';
=======
import App from './components/App';
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById('root'));
=======
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

=======
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
    <App />
    </FirebaseContext.Provider>, 
    document.getElementById('root'));
<<<<<<< HEAD
>>>>>>> tanuj
=======
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
