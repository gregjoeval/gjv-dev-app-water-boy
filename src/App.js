// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

// Our Dependencies
import configureStore from './store/configureStore';
import AppConfigProvider from './components/app-config-provider';
import AppThemeProvider from './components/app-theme-provider';
import AppAuthProvider from './components/app-auth-provider';
import PrivateRoute from './components/private-route';

// Screens
import Home, {HomePath} from './screens/home';
import NotFound, {NotFoundPath} from './screens/not-found';
import Auth0Callback, {Auth0CallbackPath} from './screens/auth0-callback';
import Secret, {SecretPath} from './screens/secret';

const preloadedState = {};

const App = () => {
    const {store, persistor} = configureStore(preloadedState);

    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <AppConfigProvider>
                        <AppThemeProvider>
                            <AppAuthProvider>
                                <Switch>
                                    <Route
                                        component={Home}
                                        exact={true}
                                        path={'/'}
                                    />
                                    <Route
                                        component={Home}
                                        path={HomePath}
                                    />
                                    <PrivateRoute
                                        component={Secret}
                                        path={SecretPath}
                                    />
                                    <Route
                                        component={Auth0Callback}
                                        path={Auth0CallbackPath}
                                    />
                                    <Route
                                        component={NotFound}
                                        path={NotFoundPath}
                                    />
                                    <Route component={NotFound}/>
                                </Switch>
                            </AppAuthProvider>
                        </AppThemeProvider>
                    </AppConfigProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
