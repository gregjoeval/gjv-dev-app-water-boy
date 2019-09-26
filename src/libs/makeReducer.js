import DataSourceStore from '../models/data-source-store';
import * as R from 'ramda';
import {createReducer} from 'redux-starter-kit';
import Action from '../models/action';

const defaultFactoryFunction = DataSourceStore.create;

const defaultInitialDataState = defaultFactoryFunction();

const deleteAction = (state, action) => {
    const data = R.omit([action.payload], state.data);
    return defaultFactoryFunction({...defaultInitialDataState, data: data});
};
const failAction = (state, action) => defaultFactoryFunction({...defaultInitialDataState, error: action.payload, data: state.data});
const fetchAction = (state, action) => defaultFactoryFunction({...defaultInitialDataState, data: action.payload});
const resetAction = () => defaultInitialDataState;
const requestAction = (state) => defaultFactoryFunction({...defaultInitialDataState, loading: true, data: state.data});
const setAction = (state, action) => defaultFactoryFunction({...defaultInitialDataState, data: action.payload});
const updateAction = (state, action) => {
    const data = R.mergeDeepRight(state.data, action.payload);
    return defaultFactoryFunction({...defaultInitialDataState, data: data});
};

const defaultVerbs = {
    DELETE: 'DELETE',
    FAIL: 'FAIL',
    FETCH: 'FETCH',
    RESET: 'RESET',
    REQUEST: 'REQUEST',
    SET: 'SET',
    UPDATE: 'UPDATE'
};

const createActionTypes = (noun, verbs = defaultVerbs, separator = '__') => {
    const list = R.filter((x) => Boolean(x), verbs); // remove falsy items
    return R.reduce((acc, verb) => {
        const actionType = R.join(separator, [noun, verb]);
        return R.assoc(verb, actionType, acc);
    }, {}, R.values(list));
};

type ActionTypes = 'DELETE' | 'FAIL' | 'FETCH' | 'RESET' | 'REQUEST' | 'SET' | 'UPDATE';
type Reducer<T> = (state: (T | null), action: Action) => T;
type Factory<TInput, T> = (args: TInput) => T
type ActionDictionary<TActionTypes, T> = {[TActionTypes]: (any) => T}

const defaultActionsDictionary = {
    [defaultVerbs.DELETE]: deleteAction,
    [defaultVerbs.FAIL]: failAction,
    [defaultVerbs.FETCH]: fetchAction,
    [defaultVerbs.RESET]: resetAction,
    [defaultVerbs.REQUEST]: requestAction,
    [defaultVerbs.SET]: setAction,
    [defaultVerbs.UPDATE]: updateAction
};

/**
 * creates a data source store and actions types
 * @param {string} resourceName -
 * @param {function} factoryFunction -
 * @param {Object} actionsDictionary -
 * @returns {[Reducer, ActionTypes]} -
 */
export const makeReducer = <TInput: Object, T: any> (
    resourceName: string,
    factoryFunction: Factory<TInput, T> = defaultFactoryFunction,
    actionsDictionary: ActionDictionary<ActionTypes, T> = defaultActionsDictionary
): [Reducer<T>, ActionTypes] => {
    const initialState = factoryFunction();
    const actionsDict = R.mergeDeepRight(defaultActionsDictionary, actionsDictionary);
    const verbs = R.keys(actionsDictionary);
    const actionTypes = createActionTypes(resourceName, verbs);
    const actionTypeVerbs = R.keys(actionTypes);

    const actionsMap = R.reduce((acc, verb) => {
        const actionType = actionTypes[verb];
        const action = actionsDict[verb];
        return R.assoc(actionType, action, acc);
    }, {}, actionTypeVerbs);

    const reducer = createReducer(initialState, actionsMap);

    if (process.env.NODE_ENV === 'development') {
        /* eslint-disable no-console */
        console.groupCollapsed(resourceName);
        console.groupCollapsed('actionTypes');
        console.table(actionTypes);
        console.groupEnd();
        console.groupEnd();
        /* eslint-enable no-console */
    }

    return [reducer, actionTypes];
};