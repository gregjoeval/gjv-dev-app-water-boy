import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers';
import * as R from 'ramda';

const logger = store => next => action => {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('dispatching', action);
    }

    // eslint-disable-next-line prefer-reflect
    const result = R.call(next, action);

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('next state', store.getState());
    }

    return result;
};

const crashReporter = () => next => action => {
    try {
        // eslint-disable-next-line prefer-reflect
        return R.call(next, action);
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('Caught an exception!', err);
            throw err;
        }
    }

    return null;
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState) => {
    const store = createStore(
        persistedReducer,
        initialState,
        applyMiddleware(thunk, crashReporter, logger)
    );
    const persistor = persistStore(store);

    return {store, persistor};
};

export default configureStore;