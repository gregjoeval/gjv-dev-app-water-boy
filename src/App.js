// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import * as R from 'ramda';
// Our Dependencies
import configureStore from './store/configureStore';
import AppConfigProvider from './components/app-config-provider';
import AppThemeProvider from './components/app-theme-provider';
import AppAuthProvider from './components/app-auth-provider';
import PrivateRoute from './components/private-route';
import createScreen from './models/screen';
// Screens
import {allScreens} from './screens';
import NotFound from './screens/not-found';

const preloadedState = {};

const getRoutes = (screens) => R.reduce((acc, item) => {
    const screenModel = createScreen(item);
    const {Component, Path, hasAuth, Name} = screenModel;
    const props = {
        component: Component,
        key: Name,
        path: Path
    };
    const route = Boolean(hasAuth)
        ? <PrivateRoute {...props}/>
        : <Route {...props}/>;
    return R.append(route, acc);
}, [], R.values(screens));

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
                                    <Redirect
                                        exact={true}
                                        from={'/'}
                                        to={'/home'}
                                    />
                                    {getRoutes(allScreens)}
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
