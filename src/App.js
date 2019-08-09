// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Our Dependencies
import configureStore from './store/configureStore';
import AppThemeProvider from './components/app-theme-provider';

// Screens
import Home from './screens/home';
import NotFound from './screens/not-found';

const App = () => {
    const preloadedState = {};
    const store = configureStore(preloadedState);

    return (
        <Provider store={store}>
            <AppThemeProvider>
                <BrowserRouter>
                    <Switch>
                        <Route
                            component={Home}
                            exact={true}
                            path={'/'}
                        />
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </AppThemeProvider>
        </Provider>
    );
};

export default App;
