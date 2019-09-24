import DataSourceStore from '../models/data-source-store';
import * as R from 'ramda';
import {createReducer} from 'redux-starter-kit';
import Action from '../models/action';

const createActionType = (noun, verb, effect) => {
    const list = R.filter((x) => Boolean(x), [noun, verb, effect]);
    return R.join('__', list);
};

const createSideEffectActionTypes = (noun, verb) => {
    const effects = [null, 'REQUEST', 'SUCCESS', 'FAIL'];
    return R.reduce((acc, effect) => {
        const key = createActionType(null, verb, effect);
        const value = createActionType(noun, verb, effect);
        return R.assoc(key, value, acc);
    }, {}, effects);
};

const createDataSourceActionTypes = (noun) => {
    const verbs = ['SET', 'RESET', 'UPDATE', 'DELETE', 'FETCH'];
    return R.reduce((acc, verb) => {
        const actionTypes = createSideEffectActionTypes(noun, verb);
        return R.mergeDeepRight(acc, actionTypes);
    }, {}, verbs);
};

type ActionTypes = {
    DELETE: string;
    DELETE__FAIL: string;
    DELETE__REQUEST: string;
    DELETE__SUCCESS: string;
    FETCH: string;
    FETCH__FAIL: string;
    FETCH__REQUEST: string;
    FETCH__SUCCESS: string;
    RESET: string;
    RESET__FAIL: string;
    RESET__REQUEST: string;
    RESET__SUCCESS: string;
    SET: string;
    SET__FAIL: string;
    SET__REQUEST: string;
    SET__SUCCESS: string;
    UPDATE: string;
    UPDATE__FAIL: string;
    UPDATE__REQUEST: string;
    UPDATE__SUCCESS: string
};
type Reducer = (state: (DataSourceStore | null), action: Action) => DataSourceStore;

/**
 * creates a data source store and actions types
 * @param {string} resourceName -
 * @param {any} initialDataState -
 * @returns {[Reducer, ActionTypes]} -
 */
export const withDataSource = (resourceName, initialDataState = {}): [Reducer, ActionTypes] => {
    const initialState = DataSourceStore.create({
        loading: false,
        data: initialDataState,
        error: null
    });
    const actionTypes = createDataSourceActionTypes(resourceName);

    const {
        DELETE,
        DELETE__FAIL,
        DELETE__REQUEST,
        DELETE__SUCCESS,
        FETCH,
        FETCH__FAIL,
        FETCH__REQUEST,
        FETCH__SUCCESS,
        RESET,
        RESET__FAIL,
        RESET__REQUEST,
        RESET__SUCCESS,
        SET,
        SET__FAIL,
        SET__REQUEST,
        SET__SUCCESS,
        UPDATE,
        UPDATE__FAIL,
        UPDATE__REQUEST,
        UPDATE__SUCCESS
    } = actionTypes;

    const failAction = (state, action) => DataSourceStore.create({loading: false, error: action.payload, data: state.data});
    const requestAction = (state) => DataSourceStore.create({loading: true, error: null, data: state.data});
    const setAction = (state, action) => DataSourceStore.create({loading: false, error: null, data: action.payload});
    const resetAction = () => initialState;
    const updateAction = (state, action) => {
        const data = R.mergeDeepRight(state.data, action.payload);
        return DataSourceStore.create({loading: false, error: null, data: data});
    };
    const deleteAction = (state, action) => {
        const data = R.omit([action.payload], state.data);
        return DataSourceStore.create({loading: false, error: null, data: data});
    };
    const fetchAction = (state, action) => DataSourceStore.create({loading: false, error: null, data: action.payload});

    const reducer = createReducer(initialState, {
        [SET]: setAction,
        [SET__SUCCESS]: setAction,
        [SET__FAIL]: failAction,
        [SET__REQUEST]: requestAction,

        [RESET]: resetAction,
        [RESET__SUCCESS]: resetAction,
        [RESET__FAIL]: failAction,
        [RESET__REQUEST]: requestAction,

        [UPDATE]: updateAction,
        [UPDATE__SUCCESS]: updateAction,
        [UPDATE__FAIL]: failAction,
        [UPDATE__REQUEST]: requestAction,

        [DELETE]: deleteAction,
        [DELETE__SUCCESS]: deleteAction,
        [DELETE__FAIL]: failAction,
        [DELETE__REQUEST]: requestAction,

        [FETCH]: fetchAction,
        [FETCH__SUCCESS]: fetchAction,
        [FETCH__FAIL]: failAction,
        [FETCH__REQUEST]: requestAction
    });

    return [reducer, actionTypes];
};