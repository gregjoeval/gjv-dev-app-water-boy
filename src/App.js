// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Switch, Route, HashRouter} from 'react-router-dom';

// Our Dependencies
import configureStore from './store/configureStore';
import AppThemeProvider from './components/app-theme-provider';

// Screens
import Home from './screens/home';
import NotFound from './screens/not-found';

const preloadedState = {};

const App = () => {
    const {store, persistor} = configureStore(preloadedState);

    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}
            >
                <AppThemeProvider>
                    <HashRouter>
                        <Switch>
                            <Route
                                component={Home}
                                exact={true}
                                path={'/'}
                            />
                            <Route
                                component={Home}
                                path={'/home'}
                            />
                            <Route
                                component={NotFound}
                                path={'/not-found'}
                            />
                            <Route component={NotFound}/>
                        </Switch>
                    </HashRouter>
                </AppThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
