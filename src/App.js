// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

// Our Dependencies
import configureStore from './store/configureStore';
import AppThemeProvider from './components/app-theme-provider';
import AppAuthProvider from './components/app-auth-provider';
import Authenticated from './components/authenticated';
import Unauthenticated from './components/unauthenticated';

// Screens
import Home from './screens/home';
import NotFound from './screens/not-found';
import Auth0Callback from './screens/auth0-callback';
import Secret from './screens/secret';

const preloadedState = {};

const App = () => {
    const {store, persistor} = configureStore(preloadedState);

    return (
        <BrowserRouter>
            <AppAuthProvider>
                <Provider store={store}>
                    <PersistGate
                        loading={null}
                        persistor={persistor}
                    >
                        <AppThemeProvider>
                            <Authenticated>
                                <Switch>
                                    <Route
                                        component={Secret}
                                        path={'/secret'}
                                    />
                                    <Route
                                        component={Auth0Callback}
                                        path={'/auth0_callback'}
                                    />
                                    <Route component={Secret}/>
                                </Switch>
                            </Authenticated>
                            <Unauthenticated>
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
                                        component={Auth0Callback}
                                        path={'/auth0_callback'}
                                    />
                                    <Route
                                        component={NotFound}
                                        path={'/not-found'}
                                    />
                                    <Route component={NotFound}/>
                                </Switch>
                            </Unauthenticated>
                        </AppThemeProvider>
                    </PersistGate>
                </Provider>
            </AppAuthProvider>
        </BrowserRouter>
    );
};

export default App;
