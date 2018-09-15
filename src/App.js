import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import JSONViewer from './components/JSONViewer';
import GitRepos from './components/GitRepos';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Route exact path='/' component={JSONViewer}/>
                    <Route path='/repos' component={GitRepos}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
