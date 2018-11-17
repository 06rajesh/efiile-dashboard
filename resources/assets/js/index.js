/**
 * Created by Rajesh on 11/13/18.
 */

import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import '../sass/app.scss';
import store from './store';
import Login from './pages/login';
import Layout from './pages/layout';
import NotFound from './pages/notfound';

let Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Layout} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

render(
    <Root store={store}/>,
    document.getElementById('app')
);